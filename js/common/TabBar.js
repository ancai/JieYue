import React, {Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native'

import Color from '../config/color';

export default class Detail extends Component {
	props: {
		tabs: [],
		selected: 0,
		onChange: () => void;
	};

	constructor(props) {
		super(props);
		this.state = {
			selected: this.props.selected
		};
	}

	slctItem(index) {
		return this.state.selected === index ? {color: Color.BASE} : {};
	}

	changeItem(index) {
		this.setState({selected: index});
		this.props.onChange(index);
	}

	getItems() {
		let items = [];
		this.props.tabs.forEach((item, index) => {
			items.push(
				<TouchableOpacity key={'tab-'+index} style={styles.tabItem} onPress={() => this.changeItem(index)}>
					<Text style={[styles.tabTxt, this.slctItem(index)]}>{item}</Text>
				</TouchableOpacity>
			);
		});

		return items;
	}

	render() {
		return (
			<View style={styles.tabBar}>
				{this.getItems()}
			</View>
		);
	}
}

const styles = {
	tabBar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#d1d1d1'
	},
	tabItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	tabTxt: {
		fontSize: 18,
		color: '#999',
		margin: 20
	},
};