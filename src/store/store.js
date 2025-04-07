import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { interfaceSlice } from './interfaceSlice';

export default configureStore({
	reducer: {
		user: userSlice.reducer,
		interface: interfaceSlice.reducer,
	},
});
