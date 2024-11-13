import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSeenNews = createAsyncThunk('user/fetchSeenNews', async function (userID) {
	let curretBody = {
		userID: userID,
	};

	let response = await fetch('https://portal.softcom.ua/php/newsviews.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(curretBody),
	});

	let result = await response.json();

	return result;
});
