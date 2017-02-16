'use strict';
import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	Switch,
	TouchableOpacity,
	PushNotificationIOS,
} from 'react-native';
import Platform from 'Platform';
import Dimension from 'Dimensions';
import CookieManager from 'react-native-cookies';
import codePush from 'react-native-code-push';

import keys from './config/keys';
import {back} from './filter/history';
import auth from './filter/auth';
import get, {set} from './store/local';
import listener from './util/listen';

export default class Sets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: global.user,
			[keys.switchs.display]: false, //首屏图文展示 开关
			[keys.switchs.push]: false, //到期提醒
		};
	}

	componentWillMount() {
		auth(user => {
			if (user) {
				this.setState(user);
			}
		});
		get(keys.switchs.display, val => {
			this.setState({[keys.switchs.display]: !!parseInt(val)});
		});
		get(keys.switchs.push, val => {
			this.setState({[keys.switchs.push]: !!parseInt(val)});
		});
	}

	setDisplay(val) {
		set(keys.switchs.display, val ? '1' : '0');
		this.setState({[keys.switchs.display]: val});
		listener.emit(keys.action.display, val);
	}

	setPush(val) {
		set(keys.switchs.push, val ? '1' : '0');
		this.setState({[keys.switchs.push]: val});
		if (val && Platform.OS === 'ios') {
			PushNotificationIOS.checkPermissions(permissions => {
				if (!(permissions && permissions.badge)) {
					PushNotificationIOS.requestPermissions();
				}
			});
		}
		if (val) {
			listener.emit(keys.action.expires);
		}
	}

	logout() {
		CookieManager.clearAll((err, res) => {
			global.user = null;
			back(this.props.navigator);
			listener.emit(keys.action.logout, global.user);
		});
	}

	renderByUser(user) {
		if (user) {
			return (
				<TouchableOpacity style={styles.exit} onPress={this.logout.bind(this)}>
					<Text style={styles.exitTxt}>退出登录</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity style={styles.exit} onPress={() => back(this.props.navigator)}>
					<Text style={styles.loginTxt}>去登录</Text>
				</TouchableOpacity>
			);
		}
	}

	checkUpdate() {
		codePush.sync({
			updateDialog: false,
			installMode: codePush.InstallMode.IMMEDIATE
		});
	}

	render() {
		return (
			<View style={styles.wrap}>
				<TouchableOpacity style={styles.version} onPress={this.checkUpdate.bind(this)}>
					<Image style={styles.logo} source={require('./img/jieyue_120.png')} />
					<Text style={styles.vname}>图书借阅V1.3.1</Text>
				</TouchableOpacity>
				<View style={styles.switchBar}>
					<View style={styles.switchCol}>
						<Text style={styles.switchTxt}>首屏图文展示</Text>
					</View>
					<View style={[styles.switchCol, {alignItems: 'flex-end'}]}>
						<Switch value={this.state[keys.switchs.display]}
							onValueChange={this.setDisplay.bind(this)}
							style={styles.switchWidget} />
					</View>
				</View>
				<View style={styles.switchBar}>
					<View style={styles.switchCol}>
						<Text style={styles.switchTxt}>到期还书提醒</Text>
					</View>
					<View style={[styles.switchCol, {alignItems: 'flex-end'}]}>
						<Switch value={this.state[keys.switchs.push]}
							onValueChange={this.setPush.bind(this)}
							style={styles.switchWidget} />
					</View>
				</View>
				{this.renderByUser(this.state.user)}
				<View style={styles.rights}>
					<Text style={styles.rightsTxt}>Copyright© All Rights Reserved️</Text>
				</View>
			</View>
		);
	}
}

const W = Dimension.get('window').width;
const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		backgroundColor: '#f0f0f0'
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	version: {
		alignItems: 'center'
	},
	logo: {
		marginTop: 30,
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	vname: {
		color: '#999',
		marginTop: 15,
		fontSize: 15
	},
	exit: {
		backgroundColor: '#fff',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10
	},
	exitTxt: {
		fontSize: 16,
		color: '#ec4c4c'
	},
	loginTxt: {
		fontSize: 16,
		color: '#666'
	},
	rights: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: W,
		height: 40
	},
	rightsTxt: {
		fontSize: 12,
		color: '#999'
	},
	switchBar: {
		backgroundColor: '#fff',
		height: 50,
		flexDirection: 'row',
		marginTop: 10
	},
	switchCol: {
		flex: 1,
		height: 50,
		justifyContent: 'center',
	},
	switchTxt: {
		marginLeft: 15,
		color: '#333',
		fontSize: 15
	},
	switchWidget: {
		marginRight: 15,
		alignItems: 'flex-end'
	}

});