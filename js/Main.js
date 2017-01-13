'use strict';
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator
} from 'react-native';

import Home from './Home';
import Scan from './Scan';
import My from './My';
import Detail from './Detail';
import Loan from './Loan';
import LoanOK from './Over';
import Comment from './Cmnt';
import Sets from './Sets';
import routes from './common/route';
import history from './common/history';

export default class Main extends Component {
	static defaultProps = {
		title: '图书借阅'
	};

	configScene() {
		return Navigator.SceneConfigs.ToTheRight;
	}

	renderScene(router, navigator) {
		let scene;
		switch (router.name) {
		case 'Home':
			scene = <Home navigator={navigator}/>;
			break;
		case 'Scan':
			scene = <Scan navigator={navigator}/>;
			break;
		case 'My':
			scene = <My navigator={navigator}/>;
			break;
		case 'Detail':
			scene = <Detail navigator={navigator} book={router.params.book}/>;
			break;
		case 'Loan':
			scene = <Loan navigator={navigator} bookId={router.params.bookId} issueId={router.params.issueId}/>;
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
		}
		return scene;
	}

	onWillFocus(router) {
		history(router.name);
		console.log('Main.js', history().all);
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	}
});