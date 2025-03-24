import { useEffect, useState } from 'react';
import { getMailingTime, updateMailingTime } from '../../../api/mailingApi';
import s from './TimeMailingSection.module.css';
import Loader from '../../../components/UI/Loader/Loader';

const TimeMailingSection = () => {
	let [isInputTime, setInputTime] = useState('');
	let [isCurrentTime, setCurrentTime] = useState('');
	let [isLoading, setLoading] = useState(false);

	const fetchingCurrentMailingTime = async () => {
		let result = await getMailingTime();
		if (result) {
			setCurrentTime(result.time);
		}
	};

	const fetchingMailingTime = async () => {
		setLoading(true);
		let result = await updateMailingTime(isInputTime + ':00');
		if (result.status) {
			setLoading(false);
			setInputTime('');
			setTimeout(() => {
				fetchingCurrentMailingTime();
			}, 10);
		}
	};

	useEffect(() => {
		fetchingCurrentMailingTime();
	}, []);

	const onClickSubmitBtnHandler = (e) => {
		e.preventDefault();
		isInputTime && fetchingMailingTime();
	};

	return (
		<div className="section-container" style={{ width: '100%', maxWidth: '540px' }}>
			<h3>Час розсилки</h3>

			<form className={s.form}>
				<p>
					Поточний час розсилки: <b style={{ fontSize: '16px' }}>{isCurrentTime}</b>
				</p>

				<div className={s.input_block}>
					<label htmlFor="">Змінити час розсилки:</label>
					<input type="time" value={isInputTime} onChange={(e) => setInputTime(e.target.value)} />
				</div>

				<div className={s.input_block} style={{ justifyContent: 'center', minHeight: '100px' }}>
					{isLoading ? (
						<Loader />
					) : (
						<button className="standart-btn" onClick={onClickSubmitBtnHandler}>
							Змінити
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default TimeMailingSection;
