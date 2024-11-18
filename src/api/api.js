// user
export const sendUserProfile = (data) => {
	let { displayName, id, jobTitle, mail, mobilePhone, userPrincipialName } = data;
	let curretBody = {
		displayName: displayName,
		id: id,
		jobTitle: jobTitle,
		mail: mail,
		mobilePhone: mobilePhone,
		userPrincipialName: userPrincipialName,
	};

	fetch('https://portal.softcom.ua/php/userreg.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	}).then((result) => {});
};
export const addIdToSeenNews = (newsID, userID) => {
	let curretBody = {
		newsID: newsID,
		userID: userID,
	};

	return fetch('https://portal.softcom.ua/php/newsviewadd.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	}).then((response) => {
		return response;
	});
};

// news
export const getNews = (setState, all = 0) => {
	let curretBody = {
		limit: 100,
		all: all,
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
	let curretBody = {
		id: postID,
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
			setState && setState(result[0].comment);
			setStateReactions && setStateReactions(result[0].reaction);
			return result;
		});
};
export const sendCommentNews = (newsID, userID, text, setFetchingStatus) => {
	let curretBody = {
		newsID: newsID,
		userID: userID,
		text: text,
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
	let curretBody = {
		newsID: newsID,
		userID: userID,
		code: code,
	};

	return fetch('https://portal.softcom.ua/php/reactionsadd.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	}).then((response) => {
		return response;
	});
};
export const createNewPost = ({ title, tags, date, text, imgFile, cat_id, autor_id }) => {
	let data = new FormData();
	data.append('title', title);
	data.append('tags', tags);
	data.append('pub_date', date);
	data.append('text', text);
	data.append('cat_id', cat_id);
	data.append('autor_id', autor_id);
	data.append('img', imgFile);

	console.log(data);
	return fetch('https://portal.softcom.ua/php/newsadd.php', {
		method: 'POST',
		body: data,
	}).then((response) => {
		console.log(response);
		return response;
	});
};
export const deleteNewsPost = (newsID, action = 'news') => {
	// action може бути news або comments

	let curretBody = {
		newsID: newsID,
		action: action,
	};

	console.log(curretBody);

	return fetch('https://portal.softcom.ua/php/delete.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	}).then((response) => {
		console.log(response);

		return response;
	});
};
