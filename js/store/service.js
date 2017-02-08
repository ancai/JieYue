import {
	serverURL,
	table
} from '../config/env';
import get, {post} from './remote';

export default {
	//获得 图书列表(支持按 书名 模糊查询)
	getBooks(callback) {
		let args = arguments,
			url = `${serverURL}/list?${table.book}`,
			bookName,
			books;

		if (args.length === 2) {
			//处理 按照书名查询的情况，第一个参数 书名，第二个参数 回调函数
			bookName = args[0];
			callback = args[1];
			url += `&title=/${bookName}/`
		}
		get(url, (rjson) => {
			books = rjson.result;
			callback(books);
		});
	},

	//获得 某本书详情
	getBook(bookId, callback) {
		let url = `${serverURL}?_id=${bookId}&${table.book}`,
			book;
		get(url, rjson => {
			book = rjson.result;
			callback(book);
		});
	},

	//获得 图书 目录
	getToc(bookId, callback) {
		let url = `${serverURL}?_id=${bookId}&${table.toc}`,
			toc;
		get(url, rjson => {
			toc = rjson.result.toc;
			callback(toc);
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

	//获得 某本书的 借阅记录
	getLoan(bookId, issueId, isBack, callback) {
		let url = `${serverURL}/list?${table.loan}&bookId=${bookId}&issueId=${issueId}&isBack=${isBack}`;
		get(url, rjson => {
			let arry = rjson.result;
			callback(arry);
		});
	},

	//获得 某个用户的 借阅记录
	getLoanByUser(user, isBack, callback) {
		let url = `${serverURL}/list?${table.loan}&user=/${user}/&isBack=${isBack}`;
		get(url, rjson => {
			let arry = rjson.result;
			callback(arry);
		});
	},

	//获得 图书 评论
	getComments(bookId, callback) {
		let url = `${serverURL}/list?${table.comments}&bookId=${bookId}`,
			comments;
		get(url, rjson => {
			comments = rjson.result;
			callback(comments);
		});
	},

	//保存 发表的评论
	saveComment(cmnt, callback) {
		let url = `${serverURL}?${table.comments}&_id=${cmnt._id}`;
		post(url, cmnt, rjson => {
			if (rjson.success) {
				callback();
			}
		});
	}

};