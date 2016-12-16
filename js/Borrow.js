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

const LOGIN_BACK_URL = 'http://qaapi.gentie.163.com/mobile/app_login.html?type=mail&logined=1';
const LOGIN_CALL_BACK = 'https://qaapi.gentie.163.com/account/login/success';
export default class Borrow extends Component {
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
		const DATA_URL = `http://tools.f2e.netease.com/mongoapi/storage/?_id=${this.state.bookId}&path=developer.163.com/f2e/library/book&pattern=.`;
		fetch(DATA_URL)
			.then(response => response.json())
			.then((rjson) => {
				let book = rjson.result;
				this.setState({
					loaded: true,
					book: book
				});
			})
			.done();
	}


	doBorrow(book) {
		if (global.user) {
			console.log(book._id, this.state.issueId, global.user);
			let loanId = book._id + '-' + this.state.issueId;
			//查询副本表
			fetch(`http://tools.f2e.netease.com/mongoapi/storage?path=developer.163.com/f2e/library/issue&_id=${book._id}`)
			.then(response => response.json())
			.then((rjson) => {
				let issue, issueList;
				//判断 是否可借阅
				if (rjson.success && (issue = rjson.result.list[this.state.issueId-1])) {
					issueList = rjson.result.list;
					//向 借阅表 load 插入一条记录
					fetch(`http://tools.f2e.netease.com/mongoapi/storage?path=developer.163.com/f2e/library/loan&_id=${loanId}`, {
						method: 'post',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							user: global.user.username,
							time: (new Date().getTime()),
							title: book.title,
							cover: book.cover
						})
					})
					.then(response => response.json())
					.then((rjson) => {
						if (rjson.success) {
							issueList[this.state.issueId-1] = {load: loanId, status: 'off'};
							fetch(`http://tools.f2e.netease.com/mongoapi/storage?path=developer.163.com/f2e/library/issue&_id=${book._id}`, {
								method: 'post',
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									list: issueList
								})
							})
							.then(response => response.json())
							.then((rjson) => {
								if (rjson.success) {
									this.state.navigator.push({name: 'BorrowOK', bookTitle: book.title});
								}
							})
							.done();						}
					})
					.done();
				}
			})
			.done();
		} else {
			this.checkLogin(book);
		}
	}

	//检查登录状态
	checkLogin(book) {
		CookieManager.get(LOGIN_BACK_URL, (err, res) => {
			if (res.NTES_SESS || res.NTES_PASSPORT) {
				fetch(LOGIN_CALL_BACK)
					.then(() => {
						CookieManager.get(LOGIN_BACK_URL, (err, res) => {
							if (res.NTES_CMT_USER_INFO) {
								global.user = this.getUserData(res.NTES_CMT_USER_INFO);
								this.doBorrow(book);
							} else {
								this.state.navigator.replace({name: 'Page3'});
							}
						});
					})
					.done();
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
						<Image source={{uri: 'http://img10.360buyimg.com/N6/s500x500_' + book.cover}} style = {styles.pic} />
					</View>
					<View style={styles.titleWrap}><Text style={styles.title}>{book.title}</Text></View>
					<View style={styles.btns}>
						<TouchableOpacity style={styles.btnWrap}
							onPress={() => this.doBorrow(book)}
						>
							<Text style={styles.brwBtn}>借书</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.btnWrap}
							onPress={() => {this.state.navigator.replace({name: 'Page2'})}}
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
	brwBtn: {
		fontSize: 20,
		width: 80,
		padding: 10,
		paddingLeft: 20,
		height: 40,
		color: '#fff',
		backgroundColor: 'rgb(53, 167, 2)',
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 5
	},
	cancelBtn: {height: 40,padding: 10}
};