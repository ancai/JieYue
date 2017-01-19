import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

import routes, {isBusy} from './common/route';

export default class LoanOK extends Component {
	constructor(props) {
		super(props);
	}

	showDetail() {
		let navigator = this.props.navigator,
			route = routes['My'];
		if (isBusy(navigator, route)) {
			navigator.jumpTo(route);
		} else {
			navigator.push(route);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.wrapper}>
					<View style={styles.loan}>
						<Text style={styles.loanTip}>借阅成功</Text>
						<Text style={styles.loanTitle}>《{this.props.bookTitle}》</Text>
					</View>
					<View style={styles.btns}>
						<TouchableOpacity onPress={this.showDetail.bind(this)}>
							<Text style={styles.btn}>查看详情</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {this.props.navigator.popToRoute(routes['Borrow'])}}>
							<Text style={styles.btn}>再借一本</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {this.props.navigator.popToTop()}}>
							<Text style={styles.btn}>去往首页</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};
}
const styles = {
	container: {flex: 1, paddingTop: 40,},
	wrapper: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#e5f3e2',
		height: 230,
		margin: 10
	},
	loan: {
		alignItems: 'center',
		margin: 20,
		padding: 15,
	},
	loanTip: {
		fontSize: 15,
		color: '#555',
		margin: 15,
	},
	loanTitle: {
		fontSize: 18,
		color: '#333'
	},
	btns: {flex: 1, flexDirection: 'row', justifyContent: 'space-around'},
	btn: {
		fontSize: 13,
		color: '#999'
	}
};