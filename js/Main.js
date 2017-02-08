import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	View,
	Navigator
} from 'react-native';

import routes from './filter/route';
import history from './filter/history';
import tmpl from './filter/tmpl';
import BigPic from './common/BigPic';
import Books from './Books';
import Borrow from './Borrow';
import My from './My';
import Detail from './Detail';
import Scan from './Scan';
import Loan from './Loan';
import LoanOK from './Over';
import Comment from './Cmnt';
import Sets from './Sets';
import Search from './Search';

export default class Main extends Component {
	static defaultProps = {
		title: '图书借阅'
	};

	configScene(route, routeStack) {
		if (route.name === routes['BigPic'].name) {
			return Navigator.SceneConfigs.VerticalUpSwipeJump;
		} else {
			return Navigator.SceneConfigs.ToTheRight;
		}
	}

	renderScene(router, navigator) {
		let scene;
		switch (router.name) {
		case 'Home':
			scene = <Books navigator={navigator}/>;
			break;
		case 'Borrow':
			scene = <Borrow navigator={navigator}/>;
			break;
		case 'My':
			scene = <My navigator={navigator}/>;
			break;
		case 'Detail':
			scene = <Detail navigator={navigator} book={router.book} tab={router.tab}/>;
			break;
		case 'Scan':
			scene = <Scan navigator={navigator}/>;
			break;
		case 'Loan':
			scene = <Loan navigator={navigator} bookId={router.bookId} issueId={router.issueId}/>;
			break;
		case 'LoanOK':
			scene = <LoanOK navigator={navigator} bookTitle={router.bookTitle} />;
			break;
		case 'Comment':
			scene = <Comment navigator={navigator} bookId={router.bookId}/>;
			break;
		case 'Sets':
			scene = <Sets navigator={navigator} />;
			break;
		case 'Search':
			scene = <Search navigator={navigator} />;
			break;
		case 'BigPic':
			scene = <BigPic navigator={navigator} picUri={router.picUri}/>;
			break;
		}
		return tmpl(navigator, scene, router);
	}

	onWillFocus(router) {
		history(router.name);
	}

	render() {
		return (
			<Navigator initialRoute={routes['Home']}
				configScene={this.configScene}
				renderScene={this.renderScene}
				onWillFocus={this.onWillFocus}/>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	}
};