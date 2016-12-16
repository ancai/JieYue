import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

var Dimension = require("Dimensions");
var totalWidth = Dimension.get('window').width;
let navBtnW = totalWidth / 3;
let navBtnH = navBtnW * 0.5;
export default class NavBar extends Component {
	constructor(props) {
		super(props);
		this.changeTab = this.changeTab.bind(this);
	}

	changeTab(route) { //切换页面
		let navigator = this.props.navigator,
			stackRouts = navigator.getCurrentRoutes(),
			flag = false,
			jumpRoute;
		stackRouts.map(stackRoute => {
			if (stackRoute.name === route.name) {
				flag = true;
				jumpRoute = stackRoute;
			}
		});
		if (flag) {
			if (route.name === 'List') {
				navigator.jumpTo(jumpRoute);
			} else {
				navigator.replace(route);
			}
		} else {
			navigator.push(route);
		}
	}

	render() {
		var btnCls = this.props.navBarStatus.map(function(i) {
			return i == 0 ? {
				backgroundColor: '#fff',
			} : {
				backgroundColor: 'rgb(53, 167, 2)',
			};
		});
		var btnTxtCls = this.props.navBarStatus.map(function(i) {
			return i == 0 ? {
				color: '#666'
			} : {
				color: '#fefefe'
			};
		});
		return (
			<View style={styles.navRow}>
				<TouchableHighlight onPress={() => {this.changeTab({name: 'List'})}}>
					<View style={[styles.btn, btnCls[0]]}>
						<Icon name="home" style={[styles.txt1, btnTxtCls[0], styles.btnIcon]} />
						<Text style={[styles.txt1, btnTxtCls[0]]}>图书馆</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => {this.changeTab({name: 'Page2'})}}>
					<View style={[styles.btn, btnCls[1]]}>
						<Icon name="book" style={[styles.txt1, btnTxtCls[1], styles.btnIcon]} />
						<Text style={[styles.txt1, btnTxtCls[1]]}>借书</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => {this.changeTab({name: 'Page3'})}}>
					<View style={[styles.btn, btnCls[2]]}>
						<Icon name="user" style={[styles.txt1, btnTxtCls[2], styles.btnIcon]} />
						<Text style={[styles.txt1, btnTxtCls[2]]}>我</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

NavBar.propTypes = {
	navBarStatus: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
};

const styles = StyleSheet.create({
	navRow: {flexDirection: 'row', position: 'absolute',bottom: 0, left: 0},
	btn: {width: navBtnW, height: navBtnH, justifyContent: 'center'},
	txt1: {fontSize: 12, textAlign: 'center', marginTop: 5},
	btnIcon: {fontSize: 25}
});