import React, {Component} from 'react';
import {
	WebView,
	DeviceEventEmitter
} from 'react-native';

import auth from './filter/auth';
import {loginURL} from './config/env';

export default class Login extends Component {
	props: {
		onLogin: () => void;
	};

	constructor(props) {
		super(props);
	}

	navChange(navState) {
		let url = navState.url;
		if (url === loginURL) {
			auth((user) => this.props.onLogin(user));
		}
	}

	render() {
		return (
			<WebView
				source={{uri: loginURL + '?type=mail'}}
				javaScriptEnabled={true}
				onNavigationStateChange={this.navChange.bind(this)}
			/>
		);
	}
}

