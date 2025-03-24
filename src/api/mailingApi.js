import { getCookie } from '../helpers/cookieMetods';

export const sendTestMail = (emails) => {
	let token = getCookie('_form_token');

	let data = new FormData();
	data.append('token', `${token}`);
	data.append('emails', emails);

	return fetch('https://portal.softcom.ua/php/sendmail.php?action=test', {
		method: 'POST',
		body: data,
	}).then((response) => {
		return response;
	});
};

export const getMailingTime = () => {
	let token = getCookie('_form_token');

	let data = new FormData();
	data.append('token', `${token}`);

	return fetch('https://portal.softcom.ua/php/sendmail.php?action=gettime', {
		method: 'POST',
		body: data,
	})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result;
		});
};

export const updateMailingTime = (time) => {
	let token = getCookie('_form_token');

	let data = new FormData();
	data.append('token', `${token}`);
	data.append('time', time);

	return fetch('https://portal.softcom.ua/php/sendmail.php?action=settime', {
		method: 'POST',
		body: data,
	}).then((response) => {
		return response;
	});
};
