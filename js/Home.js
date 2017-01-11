import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Image
} from 'react-native';
import Books from './Books';
import layout from './layout';
import tmpl from './common/tmpl';

export default class List extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var navStatus = [1, 0, 0];
		return (
			tmpl(navStatus, this.props.navigator,
				<Books navigator={this.props.navigator}/>)
		);
	}
}