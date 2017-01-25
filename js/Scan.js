import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Platform,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import Camera from 'react-native-camera';
import Loan from './Loan';

export default class Scan extends Component {
	constructor(props) {
        super(props);
        this.loaded = false;
    }

    render() {
    	var navStatus = [0, 1, 0];
        return (
        	<View style={styles.wrap}>
        		<Camera
					ref={cam => this.camera = cam}
					aspect={Camera.constants.Aspect.fill}
					onBarCodeRead={this._onBarCodeRead.bind(this)}
					style={styles.camera}>
					<View style={styles.rectangle}/>
				</Camera>
				<View style={styles.tipBar}>
					<Text style={styles.tipTxt}>无法识别二维码</Text>
				</View>
        	</View>
		);
	}

	_onPressCancel() {
		this.camera = null;
		return null;
	}

	_onBarCodeRead(result) {
		if (!this.loaded) {
			const { navigator } = this.props;
			let reg = /(\?|&)issue=(\d+)-(\d)($|&)/,
				bookId, issueId;
			if (reg.test(result.data)) {
				let matchs = result.data.match(reg);
				bookId = matchs[2];
				issueId = matchs[3];
			}
			if (navigator && bookId) {
				this.loaded = true;
				navigator.push({
					name: 'Loan',
					title: "借书",
					component: Loan,
					params: {bookId, issueId}
				});
				return;
			}
			this.camera = null;
		}
	}
}

const styles = {
	wrap: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 1)'
	},
	camera: {
		flex: 9,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tipBar: {
		flex: 1,
		backgroundColor: 'black'
	},

	tipTxt: {
		color: '#fff'
	},

	rectangle: {
		height: 250,
		width: 250,
		borderWidth: 2,
		borderColor: '#00FF00',
		backgroundColor: 'transparent',
	},
};