import React, {Component} from 'react';
import {
	WebView,
	DeviceEventEmitter
} from 'react-native';

import auth from './filter/auth';
import {LOGIN_URL} from './config/env';

export default class Login extends Component {
	props: {
		onLogin: () => void;
	};

	constructor(props) {
		super(props);
	}

	navChange(navState) {
		let url = navState.url;
		if (url === LOGIN_URL) {
			auth((user) => this.props.onLogin(user));
		}
	}

	render() {
		return (
			<WebView
				source={{uri: LOGIN_URL + '?type=mail'}}
				javaScriptEnabled={true}
				onNavigationStateChange={this.navChange.bind(this)}
			/>
		);
	}
}

