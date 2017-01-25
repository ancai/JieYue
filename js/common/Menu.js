import React, {Component} from 'react';
import {
	TouchableOpacity,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import routes from './route';
import Color from './color';
import listener from '../util/listen';

export default class Menu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let menu;
		switch (this.props.route) {
		case 'Home':
			menu = (
				<TouchableOpacity onPress={() => this.props.navigator.push(routes['Search'])}>
					<Icon name='search' style={styles.menuIcn} />
				</TouchableOpacity>
			);
			break;
		case 'My':
			menu = (
				<TouchableOpacity onPress={() => this.props.navigator.push(routes['Sets'])}>
					<Icon name='cog' style={styles.menuIcn} />
				</TouchableOpacity>
			);
			break;
		case 'Comment':
			menu = (
				<TouchableOpacity onPress={() => listener.emit('submitCmt')}>
					<Text style={styles.menuTxt}>提交</Text>
				</TouchableOpacity>
			);
			break;
		}
		return menu;
	}
}

const styles = {
	menuIcn: {
		color: '#999',
		fontSize: 20,
		paddingRight: 18,
		paddingLeft: 20
	},
	menuTxt: {
		fontSize: 16,
		color: Color.BASE,
		paddingLeft: 30,
		paddingRight: 18
	}
};