'use strict';
import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';

import Books from './Books';
import Head from './common/Head';

export default class Sets extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.wrap}>
				<Head navigator={this.props.navigator} />
				<View style={styles.row}></View>
				<View style={styles.row}></View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrap: {flex: 1},
	row: {
		flexDirection: 'row'
	}
});