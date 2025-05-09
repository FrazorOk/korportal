import { getCookie } from '../helpers/cookieMetods';
import { domain } from './api';

export const getNewsList = ({ userID, fromNumber, limitNumber, filterType, all, categoryID = 1, tagsStatus, qt = false, edit }) => {
	let token = getCookie('_form_token');

	let curretBody = {
		userID: userID,
		start: fromNumber,
		limit: limitNumber,
		categoryID: categoryID,
		all: all,
		token: token,
	};

	if (filterType === 'Популярне') curretBody.order = 'views';
	if (filterType === 'Сьогодні') curretBody.istoday = 'yes';
	if (filterType === 'Не переглянуті') curretBody.isview = 'no';
	if (tagsStatus) curretBody.tagNAME = filterType;

	if (qt) curretBody.qt = 'only';
	if (edit) curretBody.edit = edit;

	console.log(edit);

	console.log(curretBody);

	return fetch(`${domain}/php/newsout.php`, {
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
