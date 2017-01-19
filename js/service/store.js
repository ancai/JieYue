import get, {post} from '../common/data';
import {
	serverURL,
	bookImageURL,
	table
} from '../common/env';

export default {
	getBook(bookId, callback) {
		let url = `${serverURL}?_id=${bookId}&${table.book}`,
			book;
		get(url, rjson => {
			book = rjson.result;
			callback(book);
		});
	},

	// 根据图书ID 获得副本信息
	getIssues(bookId, callback) {
		let url = `${serverURL}?${table.issue}&_id=${bookId}`,
			issueList;

		get(url, rjson => {
			if (rjson.success) {
				issueList = rjson.result.list;
				callback(issueList);
			}
		});
	},

	//更新副本表的记录
	updateIssues(bookId, issueList, callback) {
		let url = `${serverURL}?${table.issue}&_id=${bookId}`;
		post(url, {list: issueList}, rjson => {
			if (rjson.success) {
				callback && callback();
			}
		});
	},

	//保存 借阅记录
	saveLoan(loan, callback) {
		let url = `${serverURL}?${table.loan}&_id=${loan._id}`;
		post(url, loan, rjson => {
			if (rjson.success) {
				callback();
			}
		});
	},

	getLoan(bookId, issueId, isBack, callback) {
		let url = `${serverURL}/list?${table.loan}&bookId=${bookId}&issueId=${issueId}&isBack=${isBack}`;
		get(url, rjson => {
			let arry = rjson.result;
			callback(arry);
		});
	},

	getLoanByUser(user, isBack, callback) {
		let url = `${serverURL}/list?${table.loan}&user=/${user}/&isBack=${isBack}`;
		get(url, rjson => {
			let arry = rjson.result;
			callback(arry);
		});
	}

};