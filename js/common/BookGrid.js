import React, {Component} from 'react';
import {
	ListView,
	View,
	Image,
	Text,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import Detail from '../Detail';
import {
	SERVER_URL,
	BOOK_IMAGE_URL
} from '../config/env';
import routes from '../filter/route';

export default class BookGrid extends Component {

	constructor(props) {
		super(props);
	}

	renderBook(book) {
		return (
			<TouchableOpacity style={styles.btn}
				onPress={() => this.showDetail(book)}
				onLongPress={() => this.showBigPic(book)}>
				<View style={styles.row}>
					<Image source={{uri: BOOK_IMAGE_URL + 's500x500_' + book.cover}} style = {styles.pic} />
				</View>
			</TouchableOpacity>
		);
	}

	showDetail(book) {
		this.props.navigator.push(
			Object.assign(routes['Detail'], {book}, {tab: 0})
		);
	}

	showBigPic(book) {
		this.props.navigator.push(
			Object.assign(routes['BigPic'], {picUri: BOOK_IMAGE_URL + 's800x800_' + book.cover})
		);
	}

	render() {
		return (
			<ListView
				initialListSize = {20}
				dataSource = {this.props.dataSource}
				renderRow = {this.renderBook.bind(this)}
				contentContainerStyle = {styles.grid}
				style={styles.list}
				removeClippedSubviews={false}
				enableEmptySections={true}
			/>
		);
	}
}

var { width, height } = Dimensions.get('window');
var col = width / 3, row = col * 1.5;
var styles = {
	list: {
		flex: 1,
		backgroundColor: '#e3ba8c'
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	btn: {
		width: col,
		height: row,
		flexDirection: 'row',
	},
	row: {
		alignItems: 'center',
		justifyContent: 'center',
		width: col,
		height: row
	},
	pic: {
		width: col-16,
		height: row - 20,
		margin: 8,
		flex:1,
		borderRadius: 5
	}
};