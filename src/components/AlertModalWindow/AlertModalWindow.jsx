import s from './AlertModalWindow.module.css';
import Loader from '../UI/Loader/Loader';
import { Link } from 'react-router-dom';

const AlertModalWindow = ({ data }) => {
	let { acceptButton, cencelButton, closeButton, isFetching, fetchingResult, text } = data;
	return (
		<div className={s.modal}>
			<div className={s.modal_container}>
				{isFetching ? (
					<Loader />
				) : (
					<div className={s.content}>
						<p className={s.text}>
							{!fetchingResult && text.question}
							{fetchingResult && fetchingResult != 'error' && text.accept}
							{fetchingResult === 'error' && text.error}
						</p>
						{!fetchingResult ? (
							<div className={s.buttons}>
								<button className="standart-btn cancel" onClick={cencelButton.handler}>
									{cencelButton.text}
								</button>
								<button className={`standart-btn ${acceptButton.class}`} onClick={acceptButton.handler}>
									{acceptButton.text}
								</button>
							</div>
						) : (
							<button onClick={closeButton.handler} className="standart-btn cancel">
								{closeButton.text}
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default AlertModalWindow;
