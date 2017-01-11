'use strict';
import React, {Component} from 'react';
import {
	View,
	StyleSheet
} from 'react-native';

import Nav from './Nav';

//整体布局：导航栏(底部) + 主体视图区域
export default function layout(navStatus, navigator, childView, bdyStyle = {}) {
	return (
		<View style={styles.container}>
			<View style={[styles.bdy, bdyStyle]}>{childView}</View>
			<Nav navBarStatus={navStatus} navigator={navigator} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		padding: 0,
	},
	bdy: {
		flex: 1,
		backgroundColor: '#fff',
		flexWrap: 'wrap'
	}
});