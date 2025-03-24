import { useState } from 'react';
import s from './AdminMailListFormSection.module.css';
import Loader from '../../../components/UI/Loader/Loader';
import { sendTestMail } from '../../../api/mailingApi';

const AdminMailListFormSection = () => {
	let [isEmails, setEmails] = useState('');
	let [isLoading, setLoading] = useState(false);

	const fetchingMailingTest = async () => {
		setLoading(true);
		let result = await sendTestMail(isEmails);
		if (result.status) {
			setLoading(false);
			setEmails('');
		}
	};

	const onClickSubmitBtnHandler = (e) => {
		e.preventDefault();

		isEmails && fetchingMailingTest();
	};

	return (
		<div className="section-container" style={{ width: '100%', maxWidth: '540px' }}>
			<h3>Відправити тестову розсилку</h3>

			<form className={s.form}>
				<div className={s.input_block}>
					<label htmlFor="">
						Emails одержувачів (через кому):
						<span title="Обов`язкове" style={{ fontSize: '20px', color: 'red' }}>
							*
						</span>
					</label>
					<input type="text" value={isEmails} onChange={(e) => setEmails(e.target.value)} placeholder="Email, email..." />
				</div>

				<div className={s.input_block} style={{ justifyContent: 'center', minHeight: '100px' }}>
					{isLoading ? (
						<Loader />
					) : (
						<button className="standart-btn" onClick={onClickSubmitBtnHandler}>
							Відправити
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default AdminMailListFormSection;
