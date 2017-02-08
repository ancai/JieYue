import routes from './route';


var list = [];
//记录访问过的路由
export default function(router) {
	let len = list.length;
	if (router) {
		list.push(router);
	} else {
		return {
			all: list,
			curr: routes[list[len-1]],
			last: len > 1 ? routes[list[len-2]] : null
		};
	}
}

// 返回前一个场景
export let back = navigator => {
	navigator.pop();
}