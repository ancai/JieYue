import React, {Component} from 'react';
import {
	WebView
} from 'react-native';

import service from './store/service';

//图书目录
export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			html: '',
			height: 0
		};
	}

	componentWillMount() {
		//	获得目录信息
		service.getToc(this.props.bookId, toc => {
			var html =
			`<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta http-equiv="content-type" content="text/html; charset=utf-8">
					<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
					<title></title>
					<script>
						window.addEventListener('load', function() {
							var h = document.documentElement.offsetHeight;
							document.body.style.height = h;
							document.title = h;
							window.location.hash = Date.now();
						});
					</script>
					<style>
						body {
							color: #555;
						}
					</style>
				</head>
				<body>${toc}</body>
			</html>`;
			this.setState({html});
		});
	}

	navChange(navState) {
		let height = Number(navState.title)|| 0;
		if (height) {
			this.setState({height});
		}
	}

	render() {
		return (
			<WebView style={[styles.catalog, {height: this.state.height}]}
				ref={"webview"}
				source={{html: this.state.html}}
				automaticallyAdjustContentInsets={true}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				decelerationRate="normal"
				onNavigationStateChange={this.navChange.bind(this)}
			/>
		);
	}
}

const styles = {
	catalog: {
		margin: 10,
		borderWidth: 1,
	},
};