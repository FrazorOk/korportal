// user

import { getCookie } from '../helpers/cookieMetods';

// ---------------------------------
export const sendUserProfile = (data) => {
	let token = getCookie('_form_token');

	let { displayName, id, jobTitle, mail, mobilePhone, userPrincipialName } = data;

	let curretBody = {
		displayName: displayName,
		id: id,
		jobTitle: jobTitle,
		mail: mail,
		mobilePhone: mobilePhone,
		userPrincipialName: userPrincipialName,
		token: token,
	};

	fetch('https://portal.softcom.ua/php/userreg.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	}).then((result) => {});
};

export const addIdToSeenNews = (newsID, userID) => {
	let token = getCookie('_form_token');

	let curretBody = {
		newsID: newsID,
		userID: userID,
		token: token,
	};

	return fetch('https://portal.softcom.ua/php/newsviewadd.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	}).then((response) => {
		return response;
	});
};
// ---------------------------------

// news
// ---------------------------------
export const getNews = (setState, all = 0, categoryID = 1) => {
	let token = getCookie('_form_token');

	let curretBody = {
		limit: 100,
		all: all,
		categoryID: categoryID,
		token: token,
	};
	return fetch('https://portal.softcom.ua/php/newsout.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			setState(result);
			return result;
		});
};
export const getNewsFromID = (postID, setState, setStateReactions) => {
	let token = getCookie('_form_token');

	let curretBody = {
		id: postID,
		token: token,
	};

	return fetch('https://portal.softcom.ua/php/newsout.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			result[0].comment && setState && setState(result[0].comment);
			result[0].reaction && setStateReactions && setStateReactions(result[0].reaction);
			return result;
		});
};
export const sendCommentNews = (newsID, userID, text, setFetchingStatus) => {
	let token = getCookie('_form_token');

	let curretBody = {
		newsID: newsID,
		userID: userID,
		text: text,
		token: token,
	};

	return fetch('https://portal.softcom.ua/php/commentadd.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			console.log(result);
		});
};
export const toggleLike = (newsID, userID, code) => {
	let token = getCookie('_form_token');

	let curretBody = {
		newsID: newsID,
		userID: userID,
		code: code,
		token: token,
	};

	return fetch('https://portal.softcom.ua/php/reactionsadd.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	}).then((response) => {
		return response;
	});
};
export const createNewPost = async ({ title, tags, date, text, imgFile, cat_id, autor_id }) => {
	let token = await getCookie('_form_token');
	console.log(token);

	let data = await new FormData();
	data.append('token', `${token}`);
	data.append('title', title);
	data.append('tags', tags);
	data.append('pub_date', date);
	data.append('text', text);
	data.append('cat_id', cat_id);
	data.append('autor_id', autor_id);
	data.append('img', imgFile);

	return fetch('https://portal.softcom.ua/php/newsadd.php', {
		method: 'POST',
		body: data,
	}).then((response) => {
		console.log(response);

		return response;
	});
};
export const updateNewsPost = ({ title, tags, date, text, imgFile, cat_id, autor_id, id }) => {
	let token = getCookie('_form_token');
	console.log(token);

	let data = new FormData();
	data.append('id', id);
	data.append('token', `${token}`);
	data.append('title', title);
	data.append('tags', tags);
	data.append('pub_date', date);
	data.append('text', text);
	data.append('cat_id', cat_id);
	data.append('autor_id', autor_id);
	data.append('img', imgFile);

	return fetch('https://portal.softcom.ua/php/newsadd.php', {
		method: 'POST',
		body: data,
	}).then((response) => {
		return response;
	});
};
export const deleteNewsPost = (newsID, action = 'news') => {
	// action може бути news або comments
	let token = getCookie('_form_token');

	let curretBody = {
		id: newsID,
		action: action,
		token: token,
	};

	return fetch('https://portal.softcom.ua/php/delete.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	}).then((response) => {
		return response;
	});
};
// --------------------------------

// Календар свят
// -------------------------------------
export const createNewHolidayDate = ({ title, date, cat_id, autor_id }) => {
	let token = getCookie('_form_token');

	let data = new FormData();
	data.append('token', `${token}`);
	data.append('title', title);
	data.append('pub_date', date);
	data.append('cat_id', cat_id);
	data.append('autor_id', autor_id);

	return fetch('https://portal.softcom.ua/php/newsadd.php', {
		method: 'POST',
		body: data,
	}).then((response) => {
		return response;
	});
};
export const updateHolidayPost = ({ title, date, cat_id, autor_id, id }) => {
	let token = getCookie('_form_token');

	let data = new FormData();
	data.append('id', id);
	data.append('token', `${token}`);
	data.append('title', title);
	data.append('pub_date', date);
	data.append('cat_id', cat_id);
	data.append('autor_id', autor_id);

	return fetch('https://portal.softcom.ua/php/newsadd.php', {
		method: 'POST',
		body: data,
	}).then((response) => {
		return response;
	});
};
export const getHolidayFromID = (postID, categoryID) => {
	let token = getCookie('_form_token');

	let curretBody = {
		id: postID,
		categoryID: categoryID,
		token: token,
	};

	return fetch('https://portal.softcom.ua/php/newsout.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			console.log(result);

			return result;
		});
};
