import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image
} from 'react-native';
import CookieManager from 'react-native-cookies';

import {
	serverURL,
	loginURL,
	bookImageURL,
	table
} from './env';
import get, {post} from './data';


export default class Loan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookId: props.bookId,
			issueId: props.issueId,
			loaded: false
		};
		this.state = props;
		this.loaded = false;
	}

	componentWillMount() {
		let url = `${serverURL}?_id=${this.state.bookId}&path=developer.163.com/f2e/library/book&pattern=.`;
		get(url, rjson => {
			let book = rjson.result;
			this.setState({
				loaded: true,
				book: book
			});
		});
	}


	doLoan(book) {
		if (global.user) {
			let loanId = book._id + '-' + this.state.issueId,
				url = `${serverURL}?${table.issue}&_id=${book._id}`;
			//查询副本表
			get(url, rjson => {
				let issue, issueList, url;
				//判断 是否可借阅
				if (rjson.success
					&& (issueList = rjson.result.list)
					&& (issue = rjson.result.list[this.state.issueId-1])) {
					//向 借阅表 load 插入一条记录
					url = `${serverURL}?${table.loan}&_id=${loanId}`;
					console.log(url);
					post(url, {
						user: global.user.username,
						time: (new Date().getTime()),
						title: book.title,
						cover: book.cover
					}, rjson => {
						if (rjson.success) {
							//将副本表的状态修改为 不可借阅
							issueList[this.state.issueId-1] = {load: loanId, status: 'off'};
							url = `${serverURL}?${table.issue}&_id=${book._id}`;
							post(url, {list: issueList}, rjson => {
								if (rjson.success) {
									this.state.navigator.push({name: 'LoanOK', bookTitle: book.title});
								}
							});
						}
					});
				}
			});
		} else {
			this.checkLogin(book);
		}
	}

	//检查登录状态
	checkLogin(book) {
		CookieManager.get(loginURL, (err, res) => {
			if (res.NTES_SESS || res.NTES_PASSPORT) {
				get(loginURL, () => {
					CookieManager.get(loginURL, (err, res) => {
						if (res.NTES_CMT_USER_INFO) {
							global.user = this.getUserData(res.NTES_CMT_USER_INFO);
							this.doLoan(book);
						} else {
							this.state.navigator.replace({name: 'My'});
						}
					});
				});
			}
		});
	}

	//获得 用户数据
	getUserData(userCookie) {
		let userInfo = decodeURIComponent(userCookie).split('|');
		return {
			userId: userInfo[0],
			nickname: userInfo[1],
			avatar: userInfo[2],
			username: userInfo[4],
		};
	}

	render() {
		if (this.state.loaded) {
			let book = this.state.book;
			return (
				<View style={styles.container}>
					<View style={styles.head}>
						<Image source={{uri: bookImageURL + 's500x500_' + book.cover}} style = {styles.pic} />
					</View>
					<View style={styles.titleWrap}><Text style={styles.title}>{book.title}</Text></View>
					<View style={styles.btns}>
						<TouchableOpacity style={styles.btnWrap}
							onPress={() => this.doLoan(book)}
						>
							<Text style={styles.brwBtn}>借书</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {this.state.navigator.push({name: 'Scan'})}}
						>
							<Text style={styles.cancelBtn}>取消</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		} else {
			return <View style={styles.container}><Text>载入数据中。。。</Text></View>
		}
	};
}
const styles = {
	container: {flex: 1, paddingTop: 50},
	head: {
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	titleWrap: {
		flex: 1,
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
	btns: {flex: 1,flexDirection: 'row',justifyContent: 'space-around'},
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
	brwBtn: {
		fontSize: 20,
		color: '#fff',
	},
	cancelBtn: {height: 40,padding: 10}
};