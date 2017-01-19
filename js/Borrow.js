import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import routes from './common/route';

export default class Borrow extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Image source={require('./img/bg.png')} style={styles.bgWrap}>
				<View style={styles.wrap}>
					<TouchableOpacity onPress={() => this.props.navigator.push(routes['Scan'])}>
						<Icon name='camera' style={styles.camera} />
					</TouchableOpacity>
					<Text style={styles.tip}>请扫描每本书上张贴的二维码=>
						<Icon name='qrcode' style={styles.qrcode}/>
					</Text>
				</View>
			</Image>
		);
	}
}

var { width, height } = Dimensions.get('window');
const styles = {
	bgWrap: {
		flex: 1,
		width: width
	},
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	camera: {
		fontSize: 120,
		color: '#f2f2f2',
		backgroundColor: 'transparent'
	},
	tip: {
		color: '#fff',
		marginTop: 15,
		fontSize: 14,
		backgroundColor: 'transparent'
	},
	qrcode: {
		fontSize: 15
	},
};