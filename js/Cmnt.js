import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput
} from 'react-native';

import {
	serverURL,
	table
} from './common/env';
import star from './common/star';


export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			title: '',
			content: ''
		};
	};

	getBookById(bookId, callback) {
		let url = `${serverURL}?${table.book}&_id=${bookId}`;
		get(url, (rjson) => {
			if (rjson.success) {
				callback(rjson.result);
			}
		});
	}

	submitData() {
		let commentId = new Date().getTime(),
			url = `${serverURL}?${table.comments}&_id=${commentId}`,
			{score, title, content} = this.state,
			{bookId} = this.props,
			{nickname} = global.user;
		post(url, {
				nickname, score, title, content, bookId
		}, rjson => {
			if (rjson.success) {
				this.getBookById(bookId, function(book) {
					this.props.navigator.push({
						name: 'Detail',
						params: {
							book: book
						}
					});
				}.bind(this));
			}
		});
	}

	pressStar(score) {
		this.setState({score});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.toolBar, styles.splitLine]}>
					<TouchableOpacity onPress={() => this.props.navigator.pop()}>
						<Text style={styles.toolTxt}>取消</Text>
					</TouchableOpacity>
					<Text style={[styles.toolTxt, styles.toolTitle]}>撰写评论</Text>
					<TouchableOpacity onPress={this.submitData.bind(this)}>
						<Text style={styles.toolTxt}>发送</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles.starBar, styles.splitLine]}>
					<View style={styles.star}>
						{star(this.state.score, this.pressStar.bind(this))}
					</View>
					<View style={styles.star}>
						<Text style={styles.starTxt}>轻点星形来评分</Text>
					</View>
				</View>
				<View style={[styles.titleCmt, styles.splitLine]}>
					<TextInput
						style={styles.titleInpt}
						placeholder='标题'
						onChangeText={(title) => this.setState({title})}
					/>
				</View>
				<View style={styles.cmnt}>
					<TextInput
						style={styles.cmntInpt}
						placeholder='评论'
						multiline={true}
						onChangeText={(content) => this.setState({content})}
					/>
				</View>
			</View>
		);
	};
}

const styles = {
	container: {flex: 1, paddingTop: 30, backgroundColor: '#fff'},
	toolBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
		paddingLeft: 20,
		paddingRight: 20,
	},
	splitLine: {
		borderBottomWidth: 1,
		borderBottomColor: '#f1f1f1'
	},
	toolTxt: {
		fontSize: 16,
		color: '#3f96ec'
	},
	toolTitle: {
		fontSize: 18,
		color: '#333'
	},
	starBar: {
		height: 65,
	},
	star: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	starTxt: {
		color: '#999',
	},
	titleCmt: {
		height: 55,
		flexDirection: 'row',
	},
	titleInpt: {
		flex: 1,
		paddingLeft: 15,
		color: '#333'
	},
	cmnt: {
		flexDirection: 'row',
		flex: 1,
		paddingTop: 10
	},
	cmntInpt: {
		flex: 1,
		paddingLeft: 15,
		fontSize: 16,
		color: '#666'
	}
};