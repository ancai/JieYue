import React, {Component} from 'react';
import {
	View,
	Image,
	Text,
	ListView
} from 'react-native';

import keys from './config/keys';
import get from './store/local';
import service from './store/service';
import BookGrid from './common/BookGrid';
import BookList from './common/BookList';
import listener from './util/listen';

export default class Books extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			loaded: false,
			[keys.switchs.display]: 0
		};
	}

	componentWillMount() {
		service.getBooks(books => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(books),
				loaded: true
			});
		});
		get(keys.switchs.display, val => this.setState({[keys.switchs.display]: parseInt(val)}));
	}

	componentDidMount() {
		listener.add(keys.action.display, val => this.setState({[keys.switchs.display]: val}));
	}

	renderLoadingView() {
		return (
			<View style={styles.loading}>
				<Image source={require('./img/loading.gif')} />
			</View>
		);
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}

		if (this.state[keys.switchs.display]) {
			return <BookList navigator={this.props.navigator} dataSource={this.state.dataSource} />;
		} else {
			return <BookGrid navigator={this.props.navigator} dataSource={this.state.dataSource} />;
		}
	}
}

var styles = {
	loading: {
		flex:1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#fff'
	}
};