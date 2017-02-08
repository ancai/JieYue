import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	DeviceEventEmitter
} from 'react-native';
import CookieManager from 'react-native-cookies';

import routes from './route';
import {
	loginURL,
	defaultPortrait,
} from '../config/env';

export default function(callback) {
	if (global.user) {
		callback(global.user);
	} else {
		CookieManager.get(loginURL, (err, res) => {
			if (res.NTES_CMT_USER_INFO) {
				let user = getUserData(res.NTES_CMT_USER_INFO);
				global.user = user;
				DeviceEventEmitter.emit('login', global.user);
			}
			callback(global.user);
		});
	}
}

//获得 用户数据
function getUserData(userCookie) {
	let userInfo = decodeURIComponent(userCookie).split('|');
	return {
		userId: userInfo[0],
		nickname: userInfo[1],
		avatar: userInfo[2] || defaultPortrait,
		username: userInfo[4],
	};
}