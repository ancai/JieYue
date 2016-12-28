import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Image
} from 'react-native';
import Books from './Books';
import layout from './layout';

export default class List extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var navStatus = [1, 0, 0];
		return (
			layout(navStatus, this.props.navigator,
				<Books navigator={navigator}/>,
				styles.bdy)
		);
	}
}

const styles = StyleSheet.create({
	bdy: {
		backgroundColor: 'beige'
	}
});