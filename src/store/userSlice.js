import { createSlice } from '@reduxjs/toolkit';
import { fetchSeenNews } from './thunks';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userData: {},
		userSeenNews: [],
	},
	reducers: {
		setUser: (state, action) => {
			state.userData = action.payload;
		},
		setSeenNews: (state, action) => {
			state.userSeenNews = action.payload;
		},
	},
	extraReducers: {
		[fetchSeenNews.fulfilled]: (state, action) => {
			state.userSeenNews = action.payload;
		},
	},
});

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setUser, setSeenNews } = userSlice.actions;
export default userSlice.reducer;
