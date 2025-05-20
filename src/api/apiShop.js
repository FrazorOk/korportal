import { getCookie } from '../helpers/cookieMetods';
import { domain } from './api';

export const getShopList = ({ userID, all = 0, categoryID = 5 }) => {
	let token = getCookie('_form_token');

	let curretBody = {
		userID: userID,
		categoryID: categoryID,
		all: all,
		token: token,
	};

	return fetch(`${domain}/php/newsout.php`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	})
		.then((response) => {
			console.log(response);

			return response.json();
		})
		.then((result) => {
			console.log(result);

			return result;
		});
};
export const getShopItemById = ({ postID, categoryID, debug = 0 }) => {
	let token = getCookie('_form_token');

	let curretBody = {
		id: postID,
		token: token,
		debug: debug,
		categoryID: categoryID,
	};

	console.log(curretBody);

	return fetch(`${domain}/php/newsout.php`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((result) => {
			console.log(result);
			return result;
		});
};
