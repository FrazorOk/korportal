import { createSlice } from '@reduxjs/toolkit';

export const interfaceSlice = createSlice({
	name: 'interface',
	initialState: {
		userInformationModalWindowStatus: false,
		userInformationModalWindowIdUser: null,
	},
	reducers: {
		toggleUserInformationModalWindowStatus: (state, action) => {
			state.userInformationModalWindowStatus = action.payload;
		},
		setUserInformationModalWindowIdUser: (state, action) => {
			state.userInformationModalWindowIdUser = action.payload;
		},
	},
});

export const { toggleUserInformationModalWindowStatus, setUserInformationModalWindowIdUser } = interfaceSlice.actions;
export default interfaceSlice.reducer;
