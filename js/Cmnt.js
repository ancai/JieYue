import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput
} from 'react-native';

import uuid from './util/uuid';
import listener from './util/listen';
import routes from './common/route';
import service from './store/service';
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

	componentDidMount() {
		listener.add('submitCmt', () => {
			this.submitData();
		});
	}

	submitData() {
		let _id = uuid(),
			{score, title, content} = this.state,
			{bookId} = this.props,
			{nickname} = global.user
			time = Date.now().toString();
		service.saveComment({
			_id, nickname, score, title, content, bookId, time
		}, () => {
			service.getBook(bookId, book => {
				this.props.navigator.push(
					Object.assign(routes['Detail'], {book})
				);
			});
		});
	}

	pressStar(score) {
		this.setState({score});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.starBar, styles.splitLine]}>
					<View style={styles.star}>
						{star(this.state.score, this.pressStar.bind(this), styles.starIcn)}
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
	splitLine: {
		borderBottomWidth: 1,
		borderBottomColor: '#f1f1f1'
	},
	starBar: {
		height: 95,
	},
	star: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	starIcn: {
		fontSize: 30,
		margin: 15
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