import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userData: {},
	},
	reducers: {
		setUser: (state, action) => {
			state.userData = action.payload;
		},
	},
});

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
