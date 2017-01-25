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
	bookImageURL
} from './common/env';

import Color from './common/color';
import Head from './common/Head';
import routes from './common/route';
import Catalog from './Catalog';
import CmntList from './Cmnts';
import service from './store/service';

export const TABS = ['INTRO', 'CATALOG', 'COMMENT'];

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: props.tab || TABS[0],
			cmnts: [],
			cmntSize: 0
		};
	}

	componentWillMount() {
		service.getComments(this.props.book._id, comments => {
			this.setState({
				cmnts: comments,
				cmntSize: comments.length
			});
		});
	}

	renderHead(book) {
		return (
			<View style={styles.head}>
				<View style={styles.headCol}>
					<TouchableOpacity onPress={() => this.props.navigator.push(Object.assign(routes['BigPic'], {picUri: bookImageURL + 's800x800_' + book.cover}))}>
						<Image source={{uri: bookImageURL + 's800x800_' + book.cover}} style = {styles.pic} />
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
		return (
			<View style={styles.tabBar}>
				<TouchableOpacity style={styles.tabItem} onPress={() => this.setState({tab: TABS[0]})}>
					<Text style={[styles.tabTxt, this.fcsItem(TABS[0])]}>简介</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tabItem} onPress={() => this.setState({tab: TABS[1]})}>
					<Text style={[styles.tabTxt, this.fcsItem(TABS[1])]}>目录</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tabItem} onPress={() => this.setState({tab: TABS[2]})}>
					<Text style={[styles.tabTxt, this.fcsItem(TABS[2])]}>评论{this.state.cmntSize?'('+ this.state.cmntSize +')':''}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	fcsItem(tab) {
		return this.state.tab === tab ? {color: Color.BASE} : {};
	}

	renderPanel(book) {
		let panel;
		switch (this.state.tab) {
		case TABS[0]:
			panel = <Text style={styles.intro}>{book.desc}</Text>;
			break;
		case TABS[1]:
			panel = <Catalog bookId={book._id} />;
			break;
		case TABS[2]:
			panel = <CmntList bookId={book._id} cmnts={this.state.cmnts} cmntSize={this.state.cmntSize}/>;
			break;
		}

		return panel;
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
		paddingRight: 5,
		paddingTop: 5,
	},
	title: {
		fontSize: 18,
		color: '#333',
		lineHeight: 30,
	},
	pic: {
		width: 200,
		height: 220,
		marginTop: 0,
	},
	tabBar: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#d1d1d1'
	},
	tabItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	tabTxt: {
		fontSize: 18,
		color: '#999',
		margin: 20
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