import React, {Component} from 'react';
import {
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import routes from './route';

export default class Menu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let menu;
		switch (this.props.route) {
		case 'My':
			menu = (
				<TouchableOpacity onPress={() => this.props.navigator.push(routes['Sets'])}>
					<Icon name='cog' style={styles.menuIcn} />
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
	}
};