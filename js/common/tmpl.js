'use strict';
import React, {Component} from 'react';
import {
	View
} from 'react-native';
import Head from './Head';
import Foot from './Foot';

//整体布局：标题栏(头部) + 主体视图区域 + 导航栏(底部)
export default function tmpl(navigator, body, navState) {
	let foot, z_foot = {};
	if (navState) {
		foot = <Foot navBarStatus={navState} navigator={navigator} />;
		z_foot = styles.z_foot;
	}

	return (
		<View style={[styles.container, z_foot]}>
			<Head navigator={navigator} />
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
	z_foot: {
		paddingBottom: 55
	},
	bdy: {
		flex: 1,
		backgroundColor: '#fff',
		flexWrap: 'wrap'
	}
};