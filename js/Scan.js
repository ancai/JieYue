import React, {Component} from 'react';
import {
	View,
	Text,
	Animated
} from 'react-native';
import Camera from 'react-native-camera';

import routes from './common/route';
import Loan from './Loan';

export default class Scan extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	tipTxt: '',
        };
        this.loaded = false;
        this.slideVal = new Animated.Value(0);
    }

    componentDidMount() {
    	this.slide();
    }

    slide() {
    	this.slideVal.setValue(0);
    	Animated.timing(
    		this.slideVal,
    		{
    			toValue: 1,
    			duration: 2400
    		}
		).start(() => this.slide());
    }

    renderEffect() {
    	return (
    		<View style={{flex: 1}}>
	    		<View style={styles.mask} />
				<View style={{flex: 1, flexDirection: 'row'}}>
					<View style={styles.mask} />
					<View style={styles.rectangle}>
						<Animated.View style={[styles.aniLine,
							{
								transform: [{
									translateY: this.slideVal.interpolate({
										inputRange: [0, 1],
										outputRange: [0, 200]  // 0 : 150, 0.5 : 75, 1 : 0
									})
								}]
							}
						]} />
					</View>
					<View style={styles.mask} />
				</View>
				<View style={styles.mask} />
			</View>
		);
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
					{this.renderEffect()}
				</Camera>
				<View style={styles.tipBar}>
					<Text style={styles.tipTxt}>{this.state.tipTxt}</Text>
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
			} else {
				this.setState({tipTxt: '无法识别二维码，请换本书再试试'});
			}
			if (navigator && bookId) {
				this.loaded = true;
				navigator.push(
					Object.assign(routes['Loan'], {bookId, issueId})
				);
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
		backgroundColor: 'black'
	},
	tipBar: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tipTxt: {
		color: '#fff',
		fontSize: 15
	},
	rectangle: {
		flex: 2,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#00FF00',
		backgroundColor: 'transparent',
		overflow: 'hidden'
	},
	aniLine: {
		flex: 1,
		height: 2,
		marginLeft: 2,
		marginRight: 2,
		marginTop: 30,
		backgroundColor: 'rgba(0, 225, 0, .5)',
	},
	mask: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, .5)'
	}
};