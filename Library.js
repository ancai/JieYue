import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import List from './js/List';
import Page2 from './js/Page2';
import Page3 from './js/Page3';
import Detail from './js/Detail';
import Borrow from './js/Borrow';
import BorrowOK from './js/BorrowOK';
import Comment from './js/Comment';
export default class Library extends Component {
  static defaultProps = {
    title: '图书借阅'
  };

  configScene() {
    return Navigator.SceneConfigs.ToTheRight;
  }
  renderScene(router, navigator) {
    this._navigator = navigator;
    switch (router.name) {
      case 'List':
        return <List navigator={navigator}/>;
      case 'Page2':
        return <Page2 navigator={navigator}/>;
      case 'Page3':
        return <Page3 navigator={navigator}/>;
      case 'Detail':
        return <Detail navigator={navigator} book={router.params.book}/>;
      case 'Borrow':
        return <Borrow navigator={navigator} bookId={router.params.bookId} issueId={router.params.issueId}/>
      case 'BorrowOK':
        return <BorrowOK navigator={navigator} bookTitle={router.bookTitle} />
      case 'Comment':
        return <Comment navigator={navigator} bookId={router.bookId}/>
    }
  }
  render() {
    return (
      <Navigator initialRoute={{name: 'List', component: List, index: 0}}
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