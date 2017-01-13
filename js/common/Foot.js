'use strict';
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimension from 'Dimensions';

import routes from '../common/route';

export default class Foot extends Component {
	constructor(props) {
		super(props);
		this.changeTab = this.changeTab.bind(this);
	}

	changeTab(route) { //切换页面
		let navigator = this.props.navigator,
			stackRouts = navigator.getCurrentRoutes(),
			flag = false,
			jumpRoute;
		stackRouts.map(stackRoute => {
			if (stackRoute.name === route.name) {
				flag = true;
				jumpRoute = stackRoute;
			}
		});
		if (flag) {
			// if (route.name === 'Home') {
				navigator.jumpTo(jumpRoute);
			// } else {
			// 	navigator.replace(route);
			// }
		} else {
			navigator.push(route);
		}
	}

	render() {
		var btnFcs = this.props.navBarStatus.map(function(i) {
			return i == 0 ? {
				color: '#999'
			} : {
				color: '#1aac19'
			};
		});
		return (
			<View style={styles.foot}>
				<TouchableOpacity style={styles.btn} onPress={() => this.changeTab(routes['Home'])}>
					<Icon name="home" style={[styles.btnTxt, btnFcs[0], styles.icon]} />
					<Text style={[styles.btnTxt, btnFcs[0]]}>{routes['Home'].title}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={() => this.changeTab(routes['Scan'])}>
					<Icon name="book" style={[styles.btnTxt, btnFcs[1], styles.icon]} />
					<Text style={[styles.btnTxt, btnFcs[1]]}>{routes['Scan'].title}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={() => this.changeTab(routes['My'])}>
					<Icon name="user" style={[styles.btnTxt, btnFcs[2], styles.icon]} />
					<Text style={[styles.btnTxt, btnFcs[2]]}>{routes['My'].title}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

Foot.propTypes = {
	navBarStatus: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
};

const colW = Dimension.get('window').width / 3;
const styles = StyleSheet.create({
	foot: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: '#f8f8f8',
		borderTopWidth: 1,
		borderTopColor: '#d1d1d1'
	},
	btn: {
		width: colW,
		height: 54,
		justifyContent: 'center'
	},
	btnTxt: {
		fontSize: 12,
		textAlign: 'center',
		marginTop: 3
	},
	icon: {
		fontSize: 25
	}
});