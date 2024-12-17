export function getCookie(name) {
	let cookie = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
	console.log('in cooki');
	return cookie ? cookie.split('=')[1] : null;
}
