'use strict';
import React, {Component} from 'react';
import {
	View
} from 'react-native';
import Head from './Head';
import Foot from './Foot';

//整体布局：标题栏(头部) + 主体视图区域 + 导航栏(底部)
export default function tmpl(navigator, body, route) {
	let head, notHead = {},
		foot, hasFoot = {};

	if (!route.hideHead) {
		head = <Head navigator={navigator} />;
	}
	if (route.hideHead) {
		notHead = {
			paddingTop: 0
		};
	}
	if (route.navState) {
		foot = <Foot navBarStatus={route.navState} navigator={navigator} />;
		hasFoot = {
			paddingBottom: 55
		};
	}

	return (
		<View style={[styles.container, hasFoot, notHead]}>
			{head}
			<View style={styles.bdy}>{body}</View>
			{foot}
		</View>
	);
}

const styles = {
	container: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 66,
		paddingBottom: 0
	},
	bdy: {
		flex: 1,
		backgroundColor: '#fff',
		flexWrap: 'wrap'
	}
};