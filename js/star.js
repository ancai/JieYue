'use strict';
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//星评价图标
function starIcon(params) {
	let score = params.score;
	return (<Icon
		key={params.key}
		name={params.name}
		style={params.style}
		onPress={() => params.handle(score)}
	/>);
}

//五星评价组件
export default function renderStars(score, handle) {
	let stars = [];
	for (let i = 0; i < 5; i++) {
		let param = {
			key: ('star=' + i),
			name: 'star-o',
			style: {fontSize: 20, color: '#fff40c', margin: 10},
			score: (i+1),
			handle: handle
		};
		if (i > score-1) {
			param.style.color = '#999';
		}
		stars.push(starIcon(param));
	}

	return stars;
}