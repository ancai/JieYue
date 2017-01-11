'use strict';
import React, {Component} from 'react';
import {
	View,
	StyleSheet
} from 'react-native';
import Head from './Head';
import Foot from './Foot';

//整体布局：标题栏(头部) + 主体视图区域 + 导航栏(底部)
export default function tmpl(navStatus, navigator, body) {
	return (
		<View style={styles.container}>
			<Head navigator={navigator} />
			<View style={styles.bdy}>{body}</View>
			<Foot navBarStatus={navStatus} navigator={navigator} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 66,
		paddingBottom: 55
	},
	bdy: {
		flex: 1,
		backgroundColor: '#fff',
		flexWrap: 'wrap'
	}
});