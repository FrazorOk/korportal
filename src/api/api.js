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
	}).then((result) => {
		console.log(result);
	});
};
export const getNews = (setState) => {
	let curretBody = {
		limit: 100,
	};

	fetch('https://portal.softcom.ua/php/newsout.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			setState(result);
		});
};
export const getNewsFromID = (setState, setStateReactions, postID) => {
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
		console.log(response);
		return response;
	});
};
