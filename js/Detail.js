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

import formatDate from './common/date';
import {
	serverURL,
	bookImageURL,
	table
} from './common/env';
import get from './common/data';
import star from './common/star';
import Head from './common/Head';

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toc: '',
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			loaded: false,
			total:0,
			tocH: 0
		};
	}

	componentDidMount() {
		let id = this.props.book._id;
		let url = `${serverURL}?_id=${id}&${table.toc}`;
		get(url, rjson => {
			var toc =
			`<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta http-equiv="content-type" content="text/html; charset=utf-8">
					<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
					<title></title>
					<script>
						window.addEventListener('load', function() {
							var h = document.documentElement.offsetHeight;
							document.body.style.height = h;
							document.title = h;
							window.location.hash = Date.now();
						});
					</script>
				</head>
				<body>${rjson.result.toc}</body>
			</html>`;
			this.setState({toc});
		});
		get(`${serverURL}/list?${table.comments}`, rjson => {
			let arry = rjson.result.filter(item => item.bookId === id);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(arry),
				loaded: true,
				total: arry.length
			});
		});
	}

	navChange(navState) {
		let h = Number(navState.title)|| 0;
		if (h) {
			this.setState({tocH: h});
		}
	}

	renderRow(cmnt) {
		return (
			<View style={styles.row}>
				<View>
					<Text style={styles.rowTitle}>{cmnt.title}</Text>
				</View>
				<View style = {styles.rowAuthor}>
					<Text style={styles.authorInfo}>{star(cmnt.score)}</Text>
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
		return (
			<ScrollView style={styles.container}>
				<View style={styles.head}>
					<Image source={{uri: bookImageURL + 's500x500_' + book.cover}} style = {styles.pic} />
					<Text style={styles.title}>{book.title}</Text>
				</View>
				<View><Text style={styles.desc}>{book.desc}</Text></View>
				<WebView style={[styles.category, {height: this.state.tocH}]}
					ref={"webview"}
					source={{html: this.state.toc}}
					automaticallyAdjustContentInsets={true}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					decelerationRate="normal"
					onNavigationStateChange={this.navChange.bind(this)}
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
				<View>
					<ListView
						initialListSize={10}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
						enableEmptySections={true}
						style={styles.list}
					/>
				</View>
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
	list: {},
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
	}
});