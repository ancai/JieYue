import {
	PushNotificationIOS
} from 'react-native';

export default (data) => {
	setInterval(() => {
		let num = parseInt(Math.random() * 10);
		console.log(num);
		PushNotificationIOS.setApplicationIconBadgeNumber(num);
	}, 5000)
	//后台推送任务
	return true;
}