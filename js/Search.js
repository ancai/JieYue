import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	ListView,
	Image,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import {bookImageURL} from './common/env';
import service from './store/service';
import routes from './common/route';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			loaded: false,
			query: '',
			size: 0
		};
	}

	findBooks() {
		service.getBooks(this.state.query, books => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(books),
				loaded: true,
				size: books.length
			});
		});
	}

	showDetail(book) {
		this.props.navigator.push(
			Object.assign(routes['Detail'], {book})
		);
	}

	renderRow(book) {
		return (
			<TouchableOpacity onPress={() => this.showDetail(book)}>
				<View style={styles.row}>
					<Image source={{uri: bookImageURL + 's120x120_' + book.cover}} style={styles.pic}/>
					<Text style={styles.bookTitle}>{book.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	renderInit() {
		return (
			<TextInput style={styles.searchBox}
				placeholder='请输入书名，按下回车展示结果'
				onChangeText = {query => this.setState({query})}
				onBlur = {this.findBooks.bind(this)}/>
		);
	}

	renderQrySch() {
		return (
			<TextInput style={[styles.searchBox, styles.schBoxTop]}
				placeholder='请输入书名，按下回车展示结果'
				onChangeText = {query => this.setState({query})}
				onBlur = {this.findBooks.bind(this)}
				defaultValue = {this.state.query}/>
		);
	}

	renderList() {
		if (this.state.size) {
			return (
				<ScrollView>
					{this.renderQrySch()}
					<ListView
						initialListSize={10}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
						style={styles.list}/>
				</ScrollView>
			);
		} else {
			return (
				<View>
					{this.renderQrySch()}
					<View style={styles.emptyTip}>
						<Text style={styles.emptyTxt}>没找到您要的书哦，换个关键字试试吧。</Text>
					</View>
				</View>
			);
		}
	}

	render() {
		if (this.state.loaded) {
			return this.renderList();
		} else {
			return this.renderInit();
		}
	}

}

const styles = {
	searchBox: {
		borderBottomWidth: 1,
		borderBottomColor: 'red',
		marginTop: 100,
		marginLeft: 20,
		marginRight: 20,
		paddingLeft: 15,
		height: 50,
		borderWidth: 1,
		borderColor: '#d1d1d1',
		borderRadius: 5,
		color: '#666'
	},
	schBoxTop: {
		marginTop: 15,
	},
	cancelTxt: {
		fontSize: 18,
		color: '#1aac19',
		marginTop: 15,
		marginLeft: -10
	},
	list: {
		paddingBottom: 1,
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		height: 140,
		alignItems: 'center',
		paddingLeft: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#d1d1d1',
		marginTop: 10,
		backgroundColor: '#fffffe'
	},
	pic: {
		width: 120,
		height: 120,
	},
	bookTitle: {
		color: '#666',
		width: 245,
		marginLeft: 15,
		fontSize: 20
	},
	emptyTip: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 200
	},
	emptyTxt: {
		fontSize: 15,
		color: '#999'
	}
};