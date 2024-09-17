import s from './SignOutButton.module.css';
import { useMsal } from '@azure/msal-react';
import exitIcon from '../../assets/img/icons/exit-icon.svg';

export const SignOutButton = ({ status }) => {
	const { instance } = useMsal();

	const handleLogout = (logoutType) => {
		if (logoutType === 'popup') {
			instance.logoutPopup({
				postLogoutRedirectUri: '/',
				mainWindowRedirectUri: '/',
			});
		} else if (logoutType === 'redirect') {
			instance.logoutRedirect({
				postLogoutRedirectUri: '/',
			});
		}
	};

	return (
		<>
			{/* <button as="button" onClick={() => handleLogout('popup')}>
				Sign out using Popup
			</button> */}
			<div className={`${s.out_button} ${status && s.active}`}>
				<button onClick={() => handleLogout('redirect')}>
					<div className={s.out_button__img}>
						<img src={exitIcon} alt="exit icon" />
					</div>
					<p>Вихід</p>
				</button>
			</div>
		</>
	);
};
