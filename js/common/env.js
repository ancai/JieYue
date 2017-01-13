'use strict';

//书籍接口地址
const SERVER_URL = 'http://tools.f2e.netease.com/mongoapi/storage';

//书籍图片
const BOOK_IMAGE_URL = 'http://img10.360buyimg.com/N6/';

//登录页面地址
const LOGIN_URL = 'https://api.gentie.163.com/mobile/app_l.html?type=mail';

//默认头像地址
const DEFAULT_PORTRAIT = 'https://simg.ws.126.net/e/img5.cache.netease.com/tie/images/yun/photo_default_62.png.39x39.100.jpg';

//Mongo DB 的表名
const TABLE = {
	//图书表
	book: 'path=developer.163.com/f2e/library/book',
	//图书目录
	toc: 'path=developer.163.com/f2e/library/toc',
	//副本表
	issue: 'path=developer.163.com/f2e/library/issue',
	//借阅表
	loan: 'path=developer.163.com/f2e/library/loan',
	//评论表
	comments: 'path=developer.163.com/f2e/library/comments'
};

export {
	SERVER_URL as serverURL,
	BOOK_IMAGE_URL as bookImageURL,
	LOGIN_URL as loginURL,
	DEFAULT_PORTRAIT as defaultPortrait,
	TABLE as table
};