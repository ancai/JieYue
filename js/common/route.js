'use strict';

const ROUTE_STACK = {
	'Home': {
		name: 'Home',
		title: '图书馆',
		level: 1,
		navState: [1, 0, 0]
	},
	'Scan': {
		name: 'Scan',
		title: '借书',
		level: 1,
		navState: [0, 1, 0]
	},
	'My': {
		name: 'My',
		title: '我',
		level: 1,
		navState: [0, 0, 1]
	},
	'Detail': {
		name: 'Detail',
		title: '图书详情'
	},
	'Loan': {
		name: 'Loan',
		title: '扫描完成'
	},
	'LoanOK': {
		name: 'LoanOK',
		title: '借书成功'
	},
	'Comment': {
		name: 'Comment',
		title: '发表评论'
	},
	'Sets': {
		name: 'Sets',
		title: '设置'
	},
};

export default ROUTE_STACK;