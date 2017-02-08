import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ListView
} from 'react-native';

import {
	bookImageURL
} from './config/env';
import keys from './config/keys';
import formatDate from './util/date';
import listener from './util/listen';
import routes from './filter/route';
import auth from './filter/auth';
import BigPic from './common/BigPic';
import TabBar from './common/TabBar';
import Login from './Login';
import service from './store/service';

export default class My extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: global.user,
			tab: 0,
			dataSourceIng: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			totalIng: 0,
			loadedIng: false,
			dataSourceOver: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
			totalOver: 0,
			loadedOver: false
		};
		this.isLogin = false;
	}

	componentWillMount() {
		auth(user => {
			if (user) {
				this.setState(user);
				this.getLoanInfo(user);
			}
		});
	}

	componentDidMount() {
		listener.add(keys.action.logout, () => {
			this.state.user = null;
		});
	}

	onLogin(user) {
		this.setState(user);
	}

	//查询 (未归还的)借阅书籍的 信息
	getLoanInfo(user) {
		if (user) {
			service.getLoanByUser(user, '0', arry => {
				this.setState({
					dataSourceIng: this.state.dataSourceIng.cloneWithRows(arry),
					totalIng: arry.length,
					loadedIng: true
				});
			});
			service.getLoanByUser(user, '1', arry => {
				this.setState({
					dataSourceOver: this.state.dataSourceOver.cloneWithRows(arry),
					totalOver: arry.length,
					loadedOver: true
				});
			});
		}
	}

	//归还图书
	backBook(loan) {
		loan.isBack = '1';
		service.saveLoan(loan, () => {
			this.getLoanInfo(global.user);
		});
	}

	showBigPic(loan) {
		this.props.navigator.push(
			Object.assign(routes['BigPic'], {
				picUri: bookImageURL + 's800x800_' + loan.cover
			})
		);
	}

	toComment(loan) {
		this.props.navigator.push(
			Object.assign(
				routes['Comment'],
				{bookId: loan.bookId}
			)
		);
	}

	renderRowIng(loan) {
		return (
			<View style={styles.row}>
				<TouchableOpacity style={styles.rowL} onPress={() => this.showBigPic(loan)} >
					<Image source={{uri: bookImageURL + 's500x500_' + loan.cover}} style={styles.bookImg}/>
				</TouchableOpacity>
				<View style={styles.rowR}>
					<View style={styles.rItem}>
						<Text style={styles.rowTxt}>借出时间：{formatDate(loan.time)}</Text>
					</View>
					<View style={styles.rItem}>
						<Text style={styles.rowTxt}>应还时间：{formatDate(3*7*24*60*60*1000 + parseInt(loan.time))}</Text>
					</View>
					<View style={styles.rBtnItem}>
						<TouchableOpacity style={styles.rBtn} onPress={() => this.toComment(loan)}>
							<Text style={[styles.rowTxt, styles.rowBtn]}>去评论</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.rBtn} onPress={() => this.backBook(loan)}>
							<Text style={[styles.rowTxt, styles.rowBtn]}>归还</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	renderRowOver(loan) {
		return (
			<View style={styles.row}>
				<TouchableOpacity style={styles.rowL} onPress={() => this.showBigPic(loan)} >
					<Image source={{uri: bookImageURL + 's500x500_' + loan.cover}} style={styles.bookImg}/>
				</TouchableOpacity>
				<View style={styles.rowR}>
					<View style={styles.rItem}>
						<Text style={styles.rowTxt}>借出时间：{formatDate(loan.time)}</Text>
					</View>
					<View style={styles.rItem}>
						<Text style={styles.rowTxt}>应还时间：{formatDate(3*7*24*60*60*1000 + parseInt(loan.time))}</Text>
					</View>
					<View style={styles.rBtnItem}>
						<TouchableOpacity style={styles.rBtn} onPress={() => this.toComment(loan)}>
							<Text style={[styles.rowTxt, styles.rowBtn]}>去评论</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	renderTab() {
		if (this.state.loadedIng && this.state.loadedOver) {
			let txtIng = this.state.totalIng ? `(${this.state.totalIng})`: '',
				txtOver = this.state.totalOver ? `(${this.state.totalOver})` : '';
			return (
				<TabBar tabs={['正在借阅'+txtIng, '已经归还'+txtOver]} selected={this.state.tab}
						onChange={index => this.setState({tab: index})} />
			);
		}
	}

	renderList() {
		if (this.state.tab === 0 && this.state.loadedIng) {
			if (this.state.totalIng) {
				return (
					<ListView
						dataSource = {this.state.dataSourceIng}
						renderRow = {this.renderRowIng.bind(this)}
						style= {styles.list}
						enableEmptySections={true}
					/>
				);
			} else {
				return (
					<View style={styles.empty}>
						<Text style={styles.emptyTxt}>您暂时还没借阅书哦</Text>
					</View>
				);
			}
		}
		if (this.state.tab === 1 && this.state.loadedOver) {
			if (this.state.totalOver) {
				return (
					<ListView
						dataSource = {this.state.dataSourceOver}
						renderRow = {this.renderRowOver.bind(this)}
						style= {styles.list}
						enableEmptySections={true}
					/>
				);
			} else {
				return (
					<View style={styles.empty}>
						<Text style={styles.emptyTxt}>您还未归还过书哦</Text>
					</View>
				);
			}
		}
	}

	renderItem(user) {
		return (
			<View>
				<View style={styles.pInfo}>
					<Image source={{uri: user.avatar}} style={styles.avatar}/>
					<Text style={styles.nickname}>{user.nickname}</Text>
				</View>
				<View style={styles.tabWrap}>
					{this.renderTab()}
				</View>
				{this.renderList()}
			</View>
		);
	}

	render() {
		let user = this.state.user || global.user;
		return user ? this.renderItem(user) : <Login onLogin={this.onLogin.bind(this)}/>;
	}
}
const styles = {
	bdy: {backgroundColor: '#fff'},
	pInfo: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	nickname: {
		fontSize: 20,
		marginLeft: 20,
		color: '#666'
	},
	setBtn: {
		position: 'absolute',
		top: 30,
		right: 15,
	},
	set: {
		fontSize: 17,
		color: '#999'
	},
	tabBar: {borderBottomWidth:0},
	tabWrap: {
		height: 62
	},
	list: {},
	row: {
		flexDirection: 'row',
		height: 200,
		justifyContent: 'space-around',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#f2f1fe'
	},
	rowL: {
		flex: 1,
		height: 180,
		alignItems: 'center'
	},
	bookImg: {width: 150, height: 180, flex: 1},
	rowR: {
		flex: 1,
		height: 180,
	},
	rItem: {
		flex: 1,
		justifyContent: 'center'
	},
	rBtnItem: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center'
	},
	rBtn: {
		flex: 1,
		justifyContent: 'center',
	},
	rowTxt: {
		color: '#999',
	},
	rowBtn: {
		color: '#666',
		fontSize: 16,
	},
	empty: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	emptyTxt: {
		color: '#999',
		fontSize: 15
	}
};