import React, {Component} from 'react'
import {
	StyleSheet,
	ScrollView,
	View,
	WebView,
	Text,
	Image,
	TouchableOpacity,
	ListView
} from 'react-native'

const formatDate = require('./formatDate');
export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toc: '',
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			loaded: false,
			total:0
		};
	}

	componentDidMount() {
		var id = this.props.book._id;
		var DATA_URL = `http://tools.f2e.netease.com/mongoapi/storage?_id=${id}&path=developer.163.com/f2e/library/toc`;
		fetch(DATA_URL)
			.then(response => response.json())
			.then((rjson) => {
				var toc = `<!DOCTYPE html>
							<html lang="en">
							<head>
								<meta http-equiv="content-type" content="text/html; charset=utf-8">
								<title></title>
							</head>
							<body>${rjson.result.toc}</body>
							</html>`;
				this.setState({toc});
			})
			.done();
		fetch(`http://tools.f2e.netease.com/mongoapi/storage/list?path=developer.163.com/f2e/library/comments`)
		.then(response => response.json())
		.then((rjson) => {
			let arry = rjson.result.filter(item => item.bookId === id);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(arry),
				loaded: true,
				total: arry.length
			});
		})
		.done();
	}

	renderRow(cmnt) {
		return (
			<View style={styles.row}>
				<View>
					<Text style={styles.rowTitle}>{cmnt.title}</Text>
				</View>
				<View style = {styles.rowAuthor}>
					<Text style={styles.authorInfo}>{cmnt.score}</Text>
					<Text style={styles.authorInfo}>{cmnt.nickname}</Text>
					<Text style={styles.authorInfo}>{formatDate(parseInt(cmnt._id))}</Text>
				</View>
				<View>
					<Text style={styles.rowCnt}>{cmnt.content}</Text>
				</View>
			</View>
		);
	}

	render() {
		let {book, navigator} = this.props;
		return (<ScrollView style={styles.container}>
			<TouchableOpacity onPress={() => navigator.pop()} style={styles.backBtn}>
				<Text>&lt;&lt;</Text>
			</TouchableOpacity>
			<View style={styles.head}>
				<Image source={{uri: 'http://img10.360buyimg.com/N6/s500x500_' + book.cover}} style = {styles.pic} />
				<Text style={styles.title}>{book.title}</Text>
			</View>
			<View><Text style={styles.desc}>{book.desc}</Text></View>
			<WebView style={styles.category}
				ref={"webview"}
				source={{html: this.state.toc}}
				automaticallyAdjustContentInsets={true}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				decelerationRate="normal"
			/>
			<View style={styles.param}>
				<Text style={styles.paramKey}>作者</Text>
				<Text style={styles.paramVal}>{book.author}</Text>
			</View>
			<View  style={styles.param}>
				<Text style={styles.paramKey}>分类</Text>
				<Text style={styles.paramVal}>{book.category}</Text>
			</View>
			<View  style={styles.param}>
				<Text style={styles.paramKey}>年份</Text>
				<Text style={styles.paramVal}>{book.year}</Text>
			</View>
			<View  style={styles.param}>
				<Text style={styles.paramKey}>ISBN</Text>
				<Text style={styles.paramVal}>{book._id}</Text>
			</View>
			<View style={styles.cmntBar}>
				<Text style={styles.cmntTitle}>评论</Text>
				<Text style={styles.cmntTotal}>{this.state.total}</Text>
			</View>
			<ListView
				initialListSize={10}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				enableEmptySections={true}
				style={styles.list}
			/>
		</ScrollView>)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		backgroundColor: "#fff"
	},
	head: {
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	title: {
		flex:1,
		fontSize: 20,
		color: '#000',
		margin: 5,
	},
	pic: {
		width: 400,
		height: 400,
		margin: 5,
	},
	desc: {
		margin: 10,
		fontSize: 15,
		color: '#333'
	},
	category: {
		margin: 10,
		borderWidth: 1,
		height: 500
	},
	param: {
		paddingTop: 10,
		paddingLeft: 20,
		flex: 1,
		flexDirection: 'row'
	},
	paramKey: {
		fontSize: 13,
		color: '#888'
	},
	paramVal: {
		marginLeft: 20,
		fontSize: 15,
		color: '#666'
	},
	paramTxt: {
		marginLeft: 20
	},
	backBtn: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f2f1f3',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		height: 30,

	},
	cmntBar: {
		flexDirection: 'row',
		paddingLeft: 20,
		paddingTop: 15,
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: '#f1f1f1'
	},
	cmntTitle: {
		fontSize: 16,
		color: '#666',
	},
	cmntTotal: {
		fontSize: 14,
		color: '#999',
		marginLeft: 10
	},
	row: {
		flex: 1,
		paddingLeft: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#f1f1f1',
	},
	rowTitle: {
		color: '#444',
		fontSize: 18,
		marginTop: 10,
		marginBottom: 5
	},
	rowAuthor: {
		flexDirection: 'row',
		height: 30,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	authorInfo: {
		color: '#999',
		marginRight: 20
	},
	rowCnt: {
		color: '#666',
		fontSize: 14,
		marginBottom: 10
	},
	list: {
		flex: 1
	}
});