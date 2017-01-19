import React, {Component} from 'react';
import {
	ListView,
	View,
	Image,
	Text,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import Detail from './Detail';
import {serverURL, bookImageURL, table} from './common/env';
import get from './common/data';
import routes from './common/route';

export default class Books extends Component {
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
		get(`${serverURL}/list?${table.book}`, (rjson) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(rjson.result),
				loaded: true
			});
		});
	}

	renderLoadingView() {
		return (<View style={styles.loading}>
			<Text style={styles.loadTxt}>正在加载图书数据......</Text>
		</View>)
	}

	renderBook(book) {
		return (<TouchableOpacity style={styles.btn} onPress={() => this.showDetail(book)}>
					<View style={styles.row}>
						<Image source={{uri: bookImageURL + 's300x300_' + book.cover}} style = {styles.pic} />
					</View>
				</TouchableOpacity>)
	}

	showDetail(book) {
		this.props.navigator.push(
			Object.assign(routes['Detail'], {book})
		);
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}

		return (
			<ListView
				initialListSize = {20}
				dataSource = {this.state.dataSource}
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
	loading: {
		flex:1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#e3ba8c'
	},
	loadTxt: {
		fontSize: 20,
		color: '#eee'
	},
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
		alignItems: 'flex-start',
		width: col,
		height: row
	},
	pic: {
		width: col - 20,
		height: row - 20,
		margin: 10,
		flex:1,
		borderRadius: 5
	}
};