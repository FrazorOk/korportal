import s from './ErrorPage.module.css';
import errorImg from '../../assets/img/error_2.jpg';
import { SignOutButton } from '../../components/SingOutButton/SignOutButton';

const ErrorPage = () => {
	return (
		<div className={s.error}>
			<div className={s.error_container}>
				<img className={s.error_img} src={errorImg} alt="" />
				<div className={s.error_row}>
					<div className={s.error_block}>
						<p>Сторінка не знайдена, поверніться на Головну</p>
						<a className="standart-btn" href="/">
							Головна
						</a>
					</div>
					<div className={s.error_block}>
						<p>Або спробуйте Вийти з облікового запису та повторити Вхід</p>
						<SignOutButton status={true} />
						{/* <button className="standart-btn cancel">Вийти</button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
