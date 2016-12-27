import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Image
} from 'react-native';
import Nav from './Nav';
import Books from './Books';

export default class List extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var navStatus = [1, 0, 0];
		return (
			<View style={styles.container}>
				<View style={styles.whatLeft}>
					<Books navigator={this.props.navigator}/>
				</View>
				<Nav navBarStatus={navStatus}
					navigator={this.props.navigator}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {flex: 1, flexDirection: 'row'},
	whatLeft: {flex: 1,borderTopWidth: 1, borderColor: 'black', backgroundColor: 'beige', flexWrap: 'wrap'}
});