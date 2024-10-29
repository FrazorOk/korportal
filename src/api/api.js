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
	console.log('HEARE MY PROFILE BODY');
	console.log(curretBody);

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
			console.log(response);
			return response.json();
		})
		.then((result) => {
			setState(result);
			console.log(result);
		});
};

export const getNewsFromID = (setState, postID) => {
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
			console.log(result);
			setState(result[0].comment);
		});
};

export const sendCommentNews = (newsID, userID, text, setFetchingStatus) => {
	let curretBody = {
		newsID: newsID,
		userID: userID,
		text: text,
	};
	console.log('BODY HEARE');
	console.log(curretBody);

	return fetch('https://portal.softcom.ua/php/commentadd.php', {
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
		});
};
