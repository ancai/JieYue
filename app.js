import {
	AppRegistry,
} from 'react-native';
import codePush from 'react-native-code-push';

import Main from './js/Main';

//Android 和 IOS 应用的入口
let codePushOptions = {
	checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};
export default function() {
	return codePush(codePushOptions)(Main);
}