import { graphConfig } from '../authConfig';

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMe(accessToken) {
	const headers = new Headers();
	const bearer = `Bearer ${accessToken}`;

	headers.append('Authorization', bearer);

	const options = {
		method: 'GET',
		headers: headers,
	};

	return fetch(graphConfig.graphMeEndpoint, options)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
export async function callPhoto(accessToken) {
	const headers = new Headers();
	const bearer = `Bearer ${accessToken}`;

	headers.append('Authorization', bearer);
	const options = {
		method: 'GET',
		headers: headers,
	};

	return fetch('https://graph.microsoft.com/v1.0/me/photo/$value', options)
		.then((response) => response)
		.catch((error) => console.log(error));
}
export async function getGroups(accessToken) {
	const headers = new Headers();
	const bearer = `Bearer ${accessToken}`;

	headers.append('Authorization', bearer);
	const options = {
		method: 'GET',
		headers: headers,
	};

	return fetch('https://graph.microsoft.com/beta/groups', options)
		.then((response) => response)
		.catch((error) => console.log(error));
}
export async function getAllUsers(accessToken) {
	const headers = new Headers();
	const bearer = `Bearer ${accessToken}`;

	headers.append('Authorization', bearer);
	const options = {
		method: 'GET',
		headers: headers,
	};

	return fetch(
		'https://graph.microsoft.com/v1.0/users?$top=999&$select=DisplayName,accountEnabled,userPrincipalName,jobTitle,onPremisesExtensionAttributes,id',
		options
	)
		.then((response) => response)
		.catch((error) => console.log(error));
}
export async function getPhotoUser(accessToken, id) {
	const headers = new Headers();
	const bearer = `Bearer ${accessToken}`;

	headers.append('Authorization', bearer);
	const options = {
		method: 'GET',
		headers: headers,
	};

	return fetch(`https://graph.microsoft.com/v1.0/users/${id}/photo/$value`, options)
		.then((response) => response)
		.catch((error) => console.log(error));
}
export async function getStructureCompany(accessToken) {
	// Отримує людей які підпорядковуються цій людині ІД
	const headers = new Headers();
	const bearer = `Bearer ${accessToken}`;

	headers.append('Authorization', bearer);
	const options = {
		method: 'GET',
		headers: headers,
	};

	// 4af0fe36-d384-4634-a344-f706b61c1158  --- ID Бобровского Сергія

	// /users/{id | userPrincipalName}/manager  --- Дізнатися керівника юзера

	return fetch('https://graph.microsoft.com/v1.0/users/4af0fe36-d384-4634-a344-f706b61c1158/directReports', options)
		.then((response) => response)
		.catch((error) => console.log(error));
}
