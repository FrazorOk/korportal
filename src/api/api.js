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

export const getNews = () => {
	fetch('https://portal.softcom.ua/php/newsout.php?limit=100', {
		headers: { 'Content-Type': 'application/json' },
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((result) => {
			console.log(result);
		});
};
