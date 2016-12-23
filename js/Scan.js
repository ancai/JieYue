import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Platform,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
import NavBar from './NavBar';
import Borrow from './Borrow';
var { width, height } = Dimensions.get('window');
export default class Scan extends Component {
	constructor(props) {
        super(props);
        this.loaded = false;
    }

    render() {
    	var navStatus = [0, 1, 0];
        return (
	    	<View style={styles.container}>
				<View style={styles.whatLeft}>
					<Camera
						ref={(cam) => {
							this.camera = cam;
						}}
						onBarCodeRead={this._onBarCodeRead.bind(this)}
						style={styles.camera}>
				        <View style={styles.rectangleContainer}>
				          <View style={styles.rectangle}/>
				        </View>
				      </Camera>
				</View>
				<NavBar navBarStatus={navStatus}
					navigator={this.props.navigator}
				/>
			</View>
		);
	}

	_onPressCancel() {
		this.camera = null;
		return null;
	}

	_onBarCodeRead(result) {
		if (!this.loaded) {
			const { navigator } = this.props;
			let reg = /(\?|&)issue=(\d+)-(\d)($|&)/,
				bookId, issueId;
			if (reg.test(result.data)) {
				let matchs = result.data.match(reg);
				bookId = matchs[2];
				issueId = matchs[3];

			}
			if (navigator && bookId) {
				this.loaded = true;
				navigator.push({
					name: 'Borrow',
					title: "借书",
					component: Borrow,
					params: {bookId, issueId}
				});
				return;
			}
		}
	}
}

const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: '#fff'},
	whatLeft: {flex: 1, borderTopWidth: 1, borderColor: 'black'},
	camera: {
	    width:width,
	    height: 500,
	    alignItems: 'center',
	    justifyContent: 'center',
	  },

	  rectangleContainer: {
	    flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'transparent',
	    height: 450
	  },

	  rectangle: {
	    height: 250,
	    width: 250,
	    borderWidth: 2,
	    borderColor: '#00FF00',
	    backgroundColor: 'transparent',
	  },


	  cancelButton: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    backgroundColor: 'white',
	    borderRadius: 3,
	    padding: 15,
	    width: 100,
	    height: 50,
	    marginBottom: 10,

	  },
	  cancelButtonText: {
	    fontSize: 17,
	    fontWeight: '500',
	    color: '#0097CE',
	  },
});