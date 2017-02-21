import React, {Component} from 'react';
import {
	View,
	Text,
	ListView
} from 'react-native';

import formatDate from '../util/date';
import star from './star';

export default class CmntList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			loaded: false,
			total:0,
		};
	}

	componentWillMount() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.props.cmnts),
			loaded: true,
			total: this.props.cmntSize
		});
	}

	renderRow(cmnt) {
		return (
			<View style={styles.row}>
				<View>
					<Text style={styles.title}>{cmnt.title}</Text>
				</View>
				<View style = {styles.author}>
					<Text style={styles.authorTxt}>{star(cmnt.score)}</Text>
					<Text style={styles.authorTxt}>{cmnt.nickname}</Text>
					<Text style={styles.authorTxt}>{formatDate(cmnt.time)}</Text>
				</View>
				<View>
					<Text style={styles.cnt}>{cmnt.content}</Text>
				</View>
			</View>
		);
	}

	render() {
		if (this.state.total) {
			return (
				<ListView
					initialListSize={10}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}
					enableEmptySections={true}
					style={styles.list}
				/>
			);
		} else {
			return (
				<View style={styles.empty}>
					<Text style={styles.emptyTxt}>暂时还没有评论哦</Text>
				</View>
			);
		}
	}

}

const styles = {
	list: {
		marginLeft: 20,
		marginRight: 20
	},
	row: {
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	title: {
		color: '#444',
		fontSize: 18,
		marginTop: 10,
		marginBottom: 5
	},
	author: {
		flexDirection: 'row',
		height: 30,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	authorTxt: {
		color: '#999',
		marginRight: 20
	},
	cnt: {
		color: '#666',
		fontSize: 14,
		marginBottom: 10
	},
	empty: {
		margin: 20,
		alignItems: 'center'
	},
	emptyTxt: {
		fontSize: 15,
		color: '#999'
	}
};