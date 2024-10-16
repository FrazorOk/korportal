import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		userData: {},
	},
	reducers: {
		increment: (state) => {},
	},
});

// Функция действия генерируется на каждую функцию релюсера(reducer), определённую в createSlice
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
