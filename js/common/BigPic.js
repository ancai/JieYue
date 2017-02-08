import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';

import {back} from '../filter/history';

export default class BigPic extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.mask}>
				<TouchableOpacity onPress={() => back(this.props.navigator)}>
					<Image source={{uri: this.props.picUri}} style = {styles.bigPic} />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	mask: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 1)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	bigPic: {
		width: 380,
		height: 500,
		justifyContent: 'center'
	},
};