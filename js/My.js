import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	WebView,
	Image,
	ListView
} from 'react-native';

import CookieManager from 'react-native-cookies';
import Icon from 'react-native-vector-icons/FontAwesome';

import NavBar from './NavBar';
import {serverURL} from './env';

const LOGIN_BACK_URL = 'http://qaapi.gentie.163.com/mobile/app_l.html';
const LOAN_INFO = `${serverURL}/list?path=developer.163.com/f2e/library/loan`;

const formatDate = require('./formatDate');

export default class My extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			total: 0,
			loaded: false
		};
		this.isLogin = false;
	}

	componentWillMount() {
		this.checkLogin();
	}

	navChange(navState) {
		let url = navState.url;
		console.log(url);
		if (url === LOGIN_BACK_URL) {
			this.checkLogin();
		}
	}

	//检查登录状态
	checkLogin() {
		CookieManager.get(LOGIN_BACK_URL, (err, res) => {
			if (res.NTES_CMT_USER_INFO) {
				let user = this.getUserData(res.NTES_CMT_USER_INFO);
				this.setState({user});
				global.user = user;
				console.log(user);
				if (user) {
					this.getLoanInfo(user);
				}
			}
		});
	}

	//获得 借阅书籍的 信息
	getLoanInfo(user) {
		fetch(LOAN_INFO)
		.then(response => response.json())
		.then((rjson) => {
			let arry = rjson.result.filter(elem => elem.user === user.username && !elem.state);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(arry),
				total: arry.length,
				loaded: true
			});
		})
		.catch(err => {
			console.log(err);
		})
		.done();
	}

	//获得 用户数据
	getUserData(userCookie) {
		let userInfo = decodeURIComponent(userCookie).split('|');
		console.log(userInfo);
		return {
			userId: userInfo[0],
			nickname: userInfo[1],
			avatar: userInfo[2] || 'https://simg.ws.126.net/e/img5.cache.netease.com/tie/images/yun/photo_default_62.png.39x39.100.jpg',
			username: userInfo[4],
		};
	}

	//归还图书
	backBook(loan) {
		loan.state = 1;
		fetch(`http://tools.f2e.netease.com/mongoapi/storage?path=developer.163.com/f2e/library/loan&_id=${loan._id}`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loan)
		})
		.then(response => response.json())
		.then((rjson) => {
			if (rjson.success) {
				this.getLoanInfo(global.user);
			}
		})
		.done();
	}

	renderRow(loan) {
		return (
			<View style={styles.row}>
				<Image source={{uri: 'http://img10.360buyimg.com/N6/s300x300_' + loan.cover}} style={styles.rowImg}/>
				<View style={styles.rowR}>
					<View style={styles.rItem}>
						<Text style={styles.rowTxt}>借出时间：{formatDate(loan.time)}</Text>
					</View>
					<View style={styles.rItem}>
						<Text style={styles.rowTxt}>应还时间：{formatDate(3*7*24*60*60*1000 + loan.time)}</Text>
					</View>
					<View style={styles.rItem}>
						<TouchableOpacity onPress={() => this.props.navigator.push({name: 'Comment', bookId: loan._id.split('-')[0]})}>
							<Text style={[styles.rowTxt, styles.rowBtn]}>去点评</Text>
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
		if (user) {
			console.log('重新绘制页面', user.avatar);
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
					/>
					<View style={styles.total}>
						<Text style={styles.label}>您总共借阅了</Text>
						<Text style={styles.count}>[{this.state.total}]</Text>
						<Text style={styles.label}>本图书</Text>
					</View>
				</View>
			);
		} else {
			return (
				<WebView
					source={{uri: LOGIN_BACK_URL + '?type=mail'}}
					style={{marginTop: 20}}
					javaScriptEnabled={true}
					onNavigationStateChange={this.navChange.bind(this)}
				/>
			);
		}
	}

	render() {
		let navStatus = [0, 0, 1], user = this.state.user || global.user;
		return (
			<View style={styles.container}>
				<View style={styles.whatLeft}>
					{this.renderItem(user)}
				</View>
				<NavBar navBarStatus={navStatus}
					navigator={this.props.navigator}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: '#fff'},
	whatLeft: {flex: 1, borderTopWidth: 1, borderColor: 'black'},
	personInfo: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 35,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f5f3fe'
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40
	},
	nickname: {
		fontSize: 20,
		marginTop: 20
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
});