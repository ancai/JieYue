'use strict';

export default function get(url, callback) {
	fetch(url)
		.then(response => response.json())
		.then((rjson) => {
			callback(rjson);
		})
		.catch(err => {
			console.log(err);
		})
		.done();

}

//params 是一个JSON对象
export function post(url, params, callback) {
	fetch(url, {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params)
	})
	.then(response => response.json())
	.then((rjson) => {
		callback(rjson);
	})
	.catch(err => {
		console.log(err);
	})
	.done();
}