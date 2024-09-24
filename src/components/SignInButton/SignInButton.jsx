import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import s from './SignInButton.module.css';
import msIcon from '../../assets/img/icons/ms_icon.svg';

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
	const { instance } = useMsal();

	const handleLogin = (loginType) => {
		if (loginType === 'popup') {
			instance.loginPopup(loginRequest).catch((e) => {
				alert(e);
			});
		} else if (loginType === 'redirect') {
			instance.loginRedirect(loginRequest).catch((e) => {
				alert(e);
			});
		}
	};
	return (
		<>
			<button className={s.button} onClick={() => handleLogin('redirect')}>
				<img src={msIcon} alt="ms logo" />
				УВІЙТИ
			</button>
			{/* <button onClick={() => handleLogin('redirect')}>Sign in using Redirect</button> */}
		</>
	);
};
