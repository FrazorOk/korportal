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
			console.log(response);
			return response.json();
		})
		.then((result) => {
			setState(result);
			console.log(result);
		});
};

export const sendCommentNews = (newsID, userID, text) => {
	let curretBody = {
		newsID: newsID,
		userID: userID,
		text: text,
	};

	fetch('https://portal.softcom.ua/php/commentadd.php', {
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
