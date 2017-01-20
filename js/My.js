import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ListView,
	DeviceEventEmitter
} from 'react-native';

import {
	bookImageURL
} from './common/env';
import formatDate from './util/date';
import routes from './common/route';
import auth from './common/auth';
import Login from './Login';
import service from './store/service';

export default class My extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: global.user,
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			total: 0,
			loaded: false
		};
		this.isLogin = false;
	}

	componentWillMount() {
		auth(user => {
			if (user) {
				this.setState(user);
				this.getLoanInfo(user);
			}
		});
	}

	componentDidMount() {
		this.subscription = DeviceEventEmitter.addListener('logout', () => {
			this.state.user = null;
		});
	}

	componentWillUnmount() {
		this.subscription.remove();
	}

	onLogin(user) {
		this.setState(user);
	}

	//查询 (未归还的)借阅书籍的 信息
	getLoanInfo(user) {
		if (user) {
			service.getLoanByUser(user, '0', arry => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(arry),
					total: arry.length,
					loaded: true
				});
			});
		}
	}

	//归还图书
	backBook(loan) {
		loan.isBack = '1';
		service.saveLoan(loan, () => {
			this.getLoanInfo(global.user);
		});
	}

	renderRow(loan) {
		return (
			<View style={styles.row}>
				<Image source={{uri: bookImageURL + 's300x300_' + loan.cover}} style={styles.rowImg}/>
				<View style={styles.rowR}>
					<View style={styles.rItem}>
						<Text style={styles.rowTxt}>借出时间：{formatDate(loan.time)}</Text>
					</View>
					<View style={styles.rItem}>
						<Text style={styles.rowTxt}>应还时间：{formatDate(3*7*24*60*60*1000 + parseInt(loan.time))}</Text>
					</View>
					<View style={styles.rItem}>
						<TouchableOpacity onPress={() => this.props.navigator.push(Object.assign(routes['Comment'], {bookId: loan.bookId}))}>
							<Text style={[styles.rowTxt, styles.rowBtn]}>去评论</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.rItem}>
						<TouchableOpacity onPress={() => this.backBook(loan)}>
							<Text style={[styles.rowTxt, styles.rowBtn]}>归还</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	renderItem(user) {
		return (
			<View>
				<View style={styles.personInfo}>
					<Image source={{uri: user.avatar}} style={styles.avatar}/>
					<Text style={styles.nickname}>{user.nickname}</Text>
				</View>
				<ListView
					dataSource = {this.state.dataSource}
					renderRow = {this.renderRow.bind(this)}
					style= {styles.list}
					enableEmptySections={true}
				/>
				<View style={styles.total}>
					<Text style={styles.label}>您总共借阅了</Text>
					<Text style={styles.count}>[{this.state.total}]</Text>
					<Text style={styles.label}>本图书</Text>
				</View>
			</View>
		);
	}

	render() {
		let user = this.state.user || global.user;
		if (user) {
			return (
				this.renderItem(user)
			);
		} else {
			return (
				<Login onLogin={this.onLogin.bind(this)}/>
			);
		}
	}
}
const styles = {
	bdy: {backgroundColor: '#fff'},
	personInfo: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f5f3fe'
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	nickname: {
		fontSize: 20,
		marginTop: 0,
		marginLeft: 20,
		color: '#666'
	},
	setBtn: {
		position: 'absolute',
		top: 30,
		right: 15,
	},
	set: {
		fontSize: 17,
		color: '#999'
	},
	list: {height: 475},
	row: {
		flexDirection: 'row',
		height: 240,
		padding: 15,
		justifyContent: 'space-around',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#f2f1fe'
	},
	rowImg: {width: 150, height: 180, flex: 1},
	rowR: {
		flex: 1,
		height: 180
	},
	rItem: {
		flexDirection: 'row',
		height: 45,
	},
	rowTxt: {
		color: '#666',
	},
	rowBtn: {
		color: '#333',
		fontSize: 15
	},
	total: {
		flexDirection: 'row',
		marginLeft: 20
	},
	label: {
		color: '#999'
	},
	count: {
		color: '#666',
	}
};