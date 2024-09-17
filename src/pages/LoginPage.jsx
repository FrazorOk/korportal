import React from 'react';
import { SignInButton } from '../components/SignInButton/SignInButton';

const LoginPage = () => {
	return (
		<div className="login-page">
			<div className="login-page__container">
				<h2>Корпоротивний портал</h2>
				<h1>СОФТКОМ</h1>
				<p>Увійдіть, будь ласка, до системи, щоб отримати доступ до порталу</p>
				<SignInButton />
			</div>
		</div>
	);
};

export default LoginPage;
