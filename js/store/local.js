import {
	AsyncStorage
} from 'react-native';
export default function get(key, callback) {
	try {
		AsyncStorage.getItem(key, (error, result) => {
			callback(result);
		});
	} catch (error) {
		console.log(error);
	}
}

export function set(key, val, callback) {
	try {
		AsyncStorage.setItem(key, val, () => {
			callback && callback();
		});
	} catch (error) {
		console.log(error);
	}
}

export function remove(key, callback) {
	try {
		AsyncStorage.removeItem(key, val, () => {
			callback && callback();
		});
	} catch (error) {
		console.log(error);
	}
}