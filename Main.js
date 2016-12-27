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

export default class Main extends Component {
  static defaultProps = {
    title: '图书借阅'
  };

  configScene() {
    return Navigator.SceneConfigs.ToTheRight;
  }

  renderScene(router, navigator) {
    this._navigator = navigator;
    switch (router.name) {
      case 'Home':
        return <Home navigator={navigator}/>;
      case 'Scan':
        return <Scan navigator={navigator}/>;
      case 'My':
        return <My navigator={navigator}/>;
      case 'Detail':
        return <Detail navigator={navigator} book={router.params.book}/>;
      case 'Loan':
        return <Loan navigator={navigator} bookId={router.params.bookId} issueId={router.params.issueId}/>
      case 'LoanOK':
        return <LoanOK navigator={navigator} bookTitle={router.bookTitle} />
      case 'Comment':
        return <Comment navigator={navigator} bookId={router.bookId}/>
    }
  }
  render() {
    return (
      <Navigator initialRoute={{name: 'Home', component: Home, index: 0}}
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