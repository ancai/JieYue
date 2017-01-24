import React, {Component} from 'react';
import {
	WebView
} from 'react-native';

export default class Toc extends Component {
	constructor(props) {
		super(props);
	}

	navChange(navState) {
		let h = Number(navState.title)|| 0;
		if (h) {
			this.setState({tocH: h});
		}
	}

	render() {
		return (
			<WebView style={[styles.category, {height: this.state.tocH}]}
				ref={"webview"}
				source={{html: this.props.toc}}
				automaticallyAdjustContentInsets={true}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				decelerationRate="normal"
				onNavigationStateChange={this.navChange.bind(this)}
			/>
		);
	}
}