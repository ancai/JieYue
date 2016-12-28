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

import {
	serverURL,
	bookImageURL,
	loginURL,
	defaultPortrait,
	table
} from './env';
import formatDate from './date';
import get from './data';
import layout from './layout';

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
		if (url === loginURL) {
			this.checkLogin();
		}
	}

	//检查登录状态
	checkLogin() {
		CookieManager.get(loginURL, (err, res) => {
			if (res.NTES_CMT_USER_INFO) {
				let user = this.getUserData(res.NTES_CMT_USER_INFO);
				this.setState({user});
				global.user = user;
				if (user) {
					this.getLoanInfo(user);
				}
			}
		});
	}

	//获得 借阅书籍的 信息
	getLoanInfo(user) {
		get(`${serverURL}/list?${table.loan}`, rjson => {
			let arry = rjson.result.filter(elem => elem.user === user.username && !elem.state);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(arry),
				total: arry.length,
				loaded: true
			});
		});
	}

	//获得 用户数据
	getUserData(userCookie) {
		let userInfo = decodeURIComponent(userCookie).split('|');
		return {
			userId: userInfo[0],
			nickname: userInfo[1],
			avatar: userInfo[2] || defaultPortrait,
			username: userInfo[4],
		};
	}

	//归还图书
	backBook(loan) {
		loan.state = 1;
		post(`${serverURL}?${table.loan}&_id=${loan._id}`, loan, rjson => {
			if (rjson.success) {
				this.getLoanInfo(global.user);
			}
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
					source={{uri: loginURL + '?type=mail'}}
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
			layout(navStatus, this.props.navigator, this.renderItem(user))
		);
	}
}
const styles = StyleSheet.create({
	bdy: {backgroundColor: '#fff'},
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