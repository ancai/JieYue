import React, {Component} from 'react'
import {
	ScrollView,
	View,
	Text,
	Image,
	TouchableOpacity,
	ListView,
} from 'react-native'

import {
	BOOK_IMAGE_URL
} from './config/env';

import Head from './filter/Head';
import routes from './filter/route';
import TabBar from './common/TabBar';
import Catalog from './common/Catalog';
import CmntList from './common/Cmnts';
import service from './store/service';

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: props.tab || 0,
			cmnts: null,
			cmntSize: 0,
			cmntLoad: false
		};
	}

	componentWillMount() {
		service.getComments(this.props.book._id, comments => {
			this.setState({
				cmnts: comments,
				cmntSize: comments.length,
			});
		});
	}

	renderHead(book) {
		return (
			<View style={styles.head}>
				<View style={styles.headCol}>
					<TouchableOpacity onPress={() => this.props.navigator.push(Object.assign(routes['BigPic'], {picUri: BOOK_IMAGE_URL + 's800x800_' + book.cover}))}>
						<Image source={{uri: BOOK_IMAGE_URL + 's800x800_' + book.cover}} style = {styles.pic} />
					</TouchableOpacity>
				</View>
				<View style={styles.headCol}>
					<View style={[styles.prop, styles.propTitle]}>
						<Text style={styles.title}>{book.title}</Text>
					</View>
					<View style={styles.prop}>
						<Text style={styles.propKey}>作者</Text>
						<Text style={styles.propVal}>{book.author}</Text>
					</View>
					<View  style={styles.prop}>
						<Text style={styles.propKey}>分类</Text>
						<Text style={styles.propVal}>{book.category}</Text>
					</View>
					<View  style={styles.prop}>
						<Text style={styles.propKey}>年份</Text>
						<Text style={styles.propVal}>{book.year}</Text>
					</View>
					<View  style={styles.prop}>
						<Text style={styles.propKey}>ISBN</Text>
						<Text style={styles.propVal}>{book._id}</Text>
					</View>
				</View>
			</View>
		);
	}

	renderTab() {
		let cmntTxt = this.state.cmntSize ? '('+ this.state.cmntSize +')' : '';
		return (
			<TabBar
				tabs={['简介', '目录', '评论' + cmntTxt]}
				selected={this.state.tab}
				onChange={index => this.setState({tab: index})}/>
		);
	}

	renderPanel(book) {
		if (0 === this.state.tab) {
			return <Text style={styles.intro}>{book.desc}</Text>;
		}
		if (1 === this.state.tab) {
			return <Catalog bookId={book._id} />;
		}
		if (2 === this.state.tab && this.state.cmnts) {
			return <CmntList bookId={book._id} cmnts={this.state.cmnts} cmntSize={this.state.cmntSize}/>;
		}
	}

	render() {
		let {book, navigator} = this.props;
		return (
			<ScrollView style={styles.container}>
				{this.renderHead(book)}
				{this.renderTab()}
				<View style={styles.panel}>{this.renderPanel(book)}</View>
			</ScrollView>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	head: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 5,
		borderBottomColor: '#dedede',
	},
	headCol: {
		flex: 1,
		height: 235,
		paddingTop: 5,
	},
	title: {
		fontSize: 18,
		color: '#333',
		lineHeight: 30,
	},
	pic: {
		height: 210,
	},
	intro: {
		margin: 10,
		fontSize: 15,
		lineHeight: 30,
		color: '#555',
	},
	prop: {
		height: 40,
		flexDirection: 'row',
	},
	propTitle: {
		height: 60,
	},
	propKey: {
		flex: 1,
		fontSize: 14,
		color: '#999',
		lineHeight: 20
	},
	propVal: {
		flex: 4,
		fontSize: 14,
		color: '#999',
		flexWrap: 'wrap',
		lineHeight: 20
	},
	panel: {
		paddingTop: 20
	}
};