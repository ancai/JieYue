import React, {Component} from 'react';
import {
	StyleSheet,
	ListView,
	View,
	Image,
	Text,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import Detail from './Detail';
import {serverURL, bookImageURL} from './env';

var { width, height } = Dimensions.get('window');
var DATA_URL = `${serverURL}/list?path=developer.163.com/f2e/library/book`;
export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			loaded: false
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch(DATA_URL)
			.then(response => response.json())
			.then((rjson) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(rjson.result),
					loaded: true
				});
			})
			.done();
	}

	renderLoadingView() {
		return (<View style={styles.loading}>
			<Text>正在加载图书数据......</Text>
		</View>)
	}

	renderBook(book) {
		return (<TouchableOpacity style={styles.btn} onPress={() => this.pressBook(book)}>
					<View style={styles.row}>
						<Image source={{uri: bookImageURL + 's300x300_' + book.cover}} style = {styles.pic} />
					</View>
				</TouchableOpacity>)
	}

	pressBook(book) {
		const { navigator } = this.props;
		if (navigator) {
			navigator.push({
				name: 'Detail',
				title: "图书详情",
				component: Detail,
				params: {
					book: book
				}
			});
		}
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}

		return (<ListView
			initialListSize = {9}
			dataSource = {this.state.dataSource}
			renderRow = {this.renderBook.bind(this)}
			contentContainerStyle = {styles.grid}
			style={styles.list}
			/>)
	}
}

var col = width / 3, row = col * 1.5;
var styles = StyleSheet.create({
	loading: {
		flex:1,
		justifyContent: "center",
		alignItems: "center"
	},
	list: {
		flex: 1,
		marginTop: 20,
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
		alignItems: 'flex-start',
		width: col,
		height: row
	},
	pic: {
		width: col - 20,
		height: row - 20,
		margin: 10,
		flex:1,
		borderWidth: 1,
		borderRadius: 5
	}
});







