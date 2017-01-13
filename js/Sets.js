'use strict';
import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	DeviceEventEmitter
} from 'react-native';
import Dimension from 'Dimensions';
import CookieManager from 'react-native-cookies';

import {back} from './common/history';

export default class Sets extends Component {
	constructor(props) {
		super(props);
	}

	logout() {
		CookieManager.clearAll((err, res) => {
			global.user = null;
			back(this.props.navigator);
			DeviceEventEmitter.emit('logout', global.user);
		});
	}
	render() {
		return (
			<View style={styles.wrap}>
				<View style={styles.version}>
					<Image style={styles.logo} source={require('./img/jieyue_120.png')} />
					<Text style={styles.vname}>图书借阅V1.3.1</Text>
				</View>
				<TouchableOpacity style={styles.exit} onPress={this.logout.bind(this)}>
					<Text style={styles.exitTxt}>退出登录</Text>
				</TouchableOpacity>
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
	}

});