import { createSlice } from '@reduxjs/toolkit';
import { fetchSeenNews } from './thunks';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userData: {},
		userSeenNews: [],
		isAdmin: false,
	},
	reducers: {
		setUser: (state, action) => {
			state.userData = action.payload;
		},
		setSeenNews: (state, action) => {
			state.userSeenNews = action.payload;
		},
		setAdmin: (state, action) => {
			state.isAdmin = action.payload;
		},
	},
	extraReducers: {
		[fetchSeenNews.fulfilled]: (state, action) => {
			state.userSeenNews = action.payload;
		},
	},
});

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setUser, setSeenNews, setAdmin } = userSlice.actions;
export default userSlice.reducer;
