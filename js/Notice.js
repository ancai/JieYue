import React, {Component} from 'react';
import {
	PushNotificationIOS,
	AlertIOS,
} from 'react-native';

class Notice extends Component {

	componentWillMount() {
		PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
	}

	_onLocalNotification(notification){
		AlertIOS.alert(
		  'Local Notification Received',
		  'Alert message: ' + notification.getMessage(),
		  [{
		    text: 'Dismiss',
		    onPress: null,
		  }]
		);
	}
}