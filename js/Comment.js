import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Comment extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.bookId);
		this.state = {
			score: 0,
			title: '',
			content: ''
		};
	};

	starIcon(params) {
		let score = params.score;
		return (<Icon
			key={params.key}
			name={params.name}
			style={params.style}
			onPress={() => this.setState({score})}
		/>);
	}

	//星评分
	renderStars(score) {
		let stars = [];
		for (let i = 0; i < 5; i++) {
			stars.push(
				this.starIcon(i > (score-1) ? {
					key:('star=' + i),
					name: 'star-o',
					style: {fontSize: 20, color: '#999', margin: 10},
					score: (i+1)
				} : {
					key:('star=' + i),
					name: 'star',
					style: {fontSize: 20, color: '#fff40c', margin: 10},
					score: (i+1)
				})
			);
		}

		return (<View style={styles.star}>{stars}</View>);
	}

	getBookById(bookId, callback) {
		fetch(`http://tools.f2e.netease.com/mongoapi/storage?path=developer.163.com/f2e/library/book&_id=${bookId}`)
		.then(response => response.json())
		.then((rjson) => {
			console.log(rjson);
			if (rjson.success) {
				callback(rjson.result);
			}
		})
		.done();
	}

	submitData() {
		let commentId = new Date().getTime(),
		{score, title, content} = this.state,
		{bookId} = this.props,
		{nickname} = global.user;
		fetch(`http://tools.f2e.netease.com/mongoapi/storage?path=developer.163.com/f2e/library/comments&_id=${commentId}`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nickname, score, title, content, bookId
			})
		})
		.then(response => response.json())
		.then((rjson) => {
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
		})
		.done();
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.toolBar, styles.splitLine]}>
					<TouchableOpacity onPress={() => this.props.navigator.pop()}><Text style={styles.toolTxt}>取消</Text></TouchableOpacity>
					<Text style={[styles.toolTxt, styles.toolTitle]}>撰写评论</Text>
					<TouchableOpacity onPress={this.submitData.bind(this)}><Text style={styles.toolTxt}>发送</Text></TouchableOpacity>
				</View>
				<View style={[styles.starBar, styles.splitLine]}>
					{this.renderStars(this.state.score)}
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