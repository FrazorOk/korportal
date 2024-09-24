import s from './LoginPage.module.css';
import logoImg from '../../assets/img/login_logo.png';
import { SignInButton } from '../../components/SignInButton/SignInButton';

const LoginPage = () => {
	return (
		<div className={s.login_page}>
			<div className={s.login_page__container}>
				<img src={logoImg} alt="logo" />
				<h2>КОРПОРТАЛ</h2>
				<p>Увійдіть, будь ласка, до системи, щоб отримати доступ до порталу</p>
				<SignInButton />
			</div>
		</div>
	);
};

export default LoginPage;
