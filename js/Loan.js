import React, {Component} from 'react';
import {
	AppRegistry,
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';
import {
	bookImageURL,
} from './common/env';
import service from './store/service';
import routes from './common/route';
import back from './common/history';
import auth from './common/auth';
import uuid from './util/uuid';
import decode from './util/base64';
import Login from './Login';

export default class Loan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			loanInfo: null
		};
	}

	componentWillMount() {
		let {
			bookId, issueId
		} = this.props;
		service.getBook(bookId, book => {
			this.setState({
				loaded: true,
				book: book
			});
		});
		service.getLoan(bookId, issueId, '0', arry => {
			if (arry.length > 0) {
				let loanInfo = arry[0];
				this.setState({loanInfo});
			}
		});
		auth(user => this.setState({user}));
	}

	//登录通知
	onLogin(user) {
		this.setState({user});
		this.setState({toLgn: false});
	}

	doLoan(book) {
		let issueId = this.props.issueId,
			loanId = uuid();
		//查询副本表
		service.getIssues(book._id, issueList => {
			let issue, url;
			//判断 是否可借阅
			if (issueList
				&& (issue = issueList[issueId-1]) ) {
				//将副本表的状态修改为 不可借阅
				issueList[issueId-1] = {load: loanId, status: 'off'};
				service.updateIssues(book._id, issueList);
				//向 借阅表 load 插入一条记录
				service.saveLoan({
					_id: loanId,
					user: global.user.username,
					time: (new Date().getTime()).toString(),
					bookId: book._id,
					issueId: issueId,
					title: book.title,
					cover: book.cover,
					isBack: '0'
				}, () => {
					this.props.navigator.push(
						Object.assign(routes['LoanOK'], {bookTitle: book.title})
					);
				});
			}
		});
	}

	renderBtn(book) {
		if (!this.state.loanInfo && this.state.user) {
			return (
				<TouchableOpacity style={styles.btnWrap} onPress={() => this.doLoan(book)}>
					<Text style={styles.brwBtn}>借书</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<View style={[styles.btnWrap, styles.btnDisable]}>
					<Text style={styles.brwBtn}>借书</Text>
				</View>
			);
		}
	}

	showWarnTip() {
		if (this.state.loanInfo) {
			let user = decode(this.state.loanInfo.user);
			return (
				<View style={styles.center}>
					<Text style={styles.tipTxt}>
						已经被{user}借走了，换本书扫码试试吧
					</Text>
				</View>
			);
		}
		if (!this.state.user) {
			return (
				<View style={[styles.center, {flexDirection: 'row'}]}>
					<Text style={styles.tipTxt}>
						您好像还没登录哦
					</Text>
					<TouchableOpacity onPress={() => {this.setState({toLgn: true})}}>
						<Text style={styles.toLgn}>
							登录体验
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}

	render() {
		if (this.state.toLgn) {
			return (
				<Login onLogin={this.onLogin.bind(this)}/>
			);

		}
		if (this.state.loaded) {
			let book = this.state.book,
				disabled = this.state.loanInfo ? {} : {};
			return (
				<View style={styles.container}>
					<View style={styles.head}>
						<Image source={{uri: bookImageURL + 's500x500_' + book.cover}} style = {styles.pic} />
					</View>
					<View style={styles.titleWrap}><Text style={styles.title}>{book.title}</Text></View>
					<View style={styles.btns}>
						{this.renderBtn(book)}
						<TouchableOpacity onPress={() => {this.props.navigator.popToRoute(routes['Borrow'])}}>
							<Text style={styles.cancelBtn}>取消</Text>
						</TouchableOpacity>
					</View>
					{this.showWarnTip()}
				</View>
			);
		} else {
			return (
				<View style={[styles.container, styles.center]}>
					<Text>载入数据中。。。</Text>
				</View>
			);
		}
	};
}
const styles = {
	container: {flex: 1, paddingTop: 50},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	head: {
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	titleWrap: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		color: '#000',
		margin: 5,
	},
	pic: {
		width: 400,
		height: 400,
		margin: 5,
	},
	btns: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 50
	},
	btnWrap: {
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		width: 80,
		height: 40,
		backgroundColor: 'rgb(53, 167, 2)',
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 5
	},
	btnDisable: {backgroundColor: 'gray'},
	brwBtn: {
		fontSize: 20,
		color: '#fff',
	},
	cancelBtn: {height: 40,padding: 10},
	tipTxt: {
		fontSize: 16,
		color: '#ec4c4c',
		padding: 15
	},
	toLgn: {
		color: 'blue',
		textDecorationLine: 'underline',
		fontSize: 18,
	},
	warnIcn: {
		fontSize: 18,
		marginRight: 15
	}
};