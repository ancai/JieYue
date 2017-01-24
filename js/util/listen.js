import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

//监听器，用于 两个没有直接关系的组件间的通信

export default {

	add(name, handle) {
		RCTDeviceEventEmitter.addListener(name, handle);
	},

	emit(name, value) {
		RCTDeviceEventEmitter.emit(name, value);
	}

};