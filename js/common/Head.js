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

export default class Head extends Component {
	constructor(props) {
		super(props);
	}

	renderBackward(currRoute, lastRoute, navigator) {
		if (currRoute.level !== 1) {
			return (
				<TouchableOpacity style={[styles.col, styles.backBtn]} onPress={() => navigator.pop()}>
					<Icon name="chevron-left" style={styles.backIcn}/>
					<Text style={styles.backTxt}>{lastRoute.title}</Text>
				</TouchableOpacity>
			);
		} else {
			return (<View style={styles.col}></View>);
		}
	}

	render() {
		let {navigator} = this.props,
			routes = navigator.getCurrentRoutes(),
			len = routes.length,
			last = routes[len-2],
			curr = routes[len-1]
		return (
			<View style={styles.head}>
				{this.renderBackward(curr, last, navigator)}
				<View style={[styles.col, styles.title]}>
					<Text style={styles.titleTxt}>{curr.title}</Text>
				</View>
				<View style={[styles.col, styles.menu]}>
					<Text> </Text>
				</View>
			</View>
		);
	}
}

const colW = Dimension.get('window').width / 3;
const styles = StyleSheet.create({
	head: {
		position: 'absolute',
		top: 0,
		left: 0,
		flexDirection: 'row',
		backgroundColor: '#f5f5f5',
		height: 65,
		alignItems: 'center',
		paddingTop: 30,
		borderBottomWidth: 1,
		borderBottomColor: '#e6e6e6'
	},
	col: {
		width: colW,
		flexDirection: 'row',
		alignItems: 'center',
	},
	backBtn: {},
	title: {
		justifyContent: 'center',
	},
	titleTxt: {
		fontSize: 18,
		color: '#333'
	},
	menu: {
		justifyContent: 'flex-end'
	},
	backIcn: {
		fontSize: 18,
		color: '#aaa',
		marginLeft: 10
	},
	backTxt: {
		fontSize: 16,
		marginLeft: 5,
		color: '#666'
	}
});