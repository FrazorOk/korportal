export let userSelector = {
	userData: (state) => state.user.userData,
	userSeenNews: (state) => state.user.userSeenNews,
	userAdminStatus: (state) => state.user.isAdmin,
};
