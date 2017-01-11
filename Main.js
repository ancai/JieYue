'use strict';
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator
} from 'react-native';

import Home from './js/Home';
import Scan from './js/Scan';
import My from './js/My';
import Detail from './js/Detail';
import Loan from './js/Loan';
import LoanOK from './js/Over';
import Comment from './js/Cmnt';
import Sets from './js/Sets';
import route from './js/route';

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
	render() {
		return (
			<Navigator initialRoute={route['Home']}
				configScene={this.configScene}
				renderScene={this.renderScene}/>
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