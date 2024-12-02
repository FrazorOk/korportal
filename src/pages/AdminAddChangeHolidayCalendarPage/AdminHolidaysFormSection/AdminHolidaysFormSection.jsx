import s from './AdminHolidaysFormSection.module.css';
import { createNewHolidayDate, deleteNewsPost, updateNewsPost } from '../../../api/api.js';
import { useEffect, useState } from 'react';
import ModalWidnow from '../../../components/UI/ModalWidnow/ModalWidnow.jsx';
import Loader from '../../../components/UI/Loader/Loader.jsx';
import { Link } from 'react-router-dom';
import AlertModalWindow from '../../../components/AlertModalWindow/AlertModalWindow.jsx';
import { userSelector } from '../../../selectors/userSelectors.js';
import { useSelector } from 'react-redux';

const AdminHolidaysFormSection = ({ Id, data }) => {
	let userID = useSelector(userSelector.userData);

	let [modalWidndovStatus, setModalWidndovStatus] = useState(false);
	let [modalWidndovStatusDelete, setModalWidndovStatusDelete] = useState(false);
	let [modalWidndovStatusUpdate, setModalWidndovStatusUpdate] = useState(false);

	let [isFetching, setFetching] = useState(false);
	let [isFetchingStatus, setFetchingStatus] = useState(false);

	let [title, setTitle] = useState('');
	let [date, setDate] = useState('');

	let [validationErrors, setValidationErrors] = useState({ title: false, date: false });

	// Functions
	const nulledAllInputs = () => {
		setTitle('');
		setDate('');
	};
	const nulledAllValidations = () => {
		setValidationErrors({ title: false, date: false });
	};
	const validationForm = async () => {
		!title && setValidationErrors((obj) => ({ ...obj, title: true }));
		!date && setValidationErrors((obj) => ({ ...obj, date: true }));

		if (title && date) {
			return true;
		} else {
			return false;
		}
	};
	const fetchingNewPost = async (data) => {
		await setFetching(true);
		await setModalWidndovStatus(true);
		let result = await createNewHolidayDate(data);
		await setFetching(false);
		if (result.status == 200) {
			nulledAllInputs();
			setFetchingStatus(true);
		} else {
			setFetchingStatus('error');
		}
	};
	const fetchingDeletePost = async () => {
		await setFetching(true);
		let result = await deleteNewsPost(Id);
		await setFetching(false);
		if (result.status == 200) {
			nulledAllInputs();
			setFetchingStatus(true);
		} else {
			console.log(`Помилка ${result.status}`);
			setFetchingStatus('error');
		}
	};
	const fetchingUpdatePost = async (data) => {
		await setFetching(true);
		let result = await updateNewsPost(data);
		await setFetching(false);
		if (result.status == 200) {
			setFetchingStatus(true);
		} else {
			console.log(`Помилка ${result.status}`);
			setFetchingStatus('error');
		}
	};

	// Handlers
	const creacteHandler = (e) => {
		e.preventDefault();

		let dataFetching = {
			title: title,
			date: date,
			cat_id: 2,
			autor_id: userID.id,
		};

		let asyncFetchingAndValidation = async () => {
			let validationStatus = await validationForm();

			if (validationStatus) {
				nulledAllValidations();
				fetchingNewPost(dataFetching);
			}
		};

		asyncFetchingAndValidation();
	};
	const deletePostHandler = (e) => {
		e.preventDefault();

		let asyncFetchingAndValidation = async () => {
			await fetchingDeletePost();
			nulledAllValidations();
		};

		asyncFetchingAndValidation();
	};
	const deleteOpenMoalHandler = (e) => {
		e.preventDefault();
		setModalWidndovStatusDelete(true);
	};
	const updatePostHandler = (e) => {
		e.preventDefault();

		let dataFetching = {
			id: Id,
			title: title,
			date: date,
			cat_id: 2,
			autor_id: userID.id,
		};

		let asyncFetchingAndValidation = async () => {
			let validationStatus = await validationForm();

			if (validationStatus) {
				nulledAllValidations();
				fetchingUpdatePost(dataFetching);
			}
		};

		asyncFetchingAndValidation();
	};
	const updateOpenMoalHandler = (e) => {
		e.preventDefault();
		setModalWidndovStatusUpdate(true);
	};

	// Effects

	useEffect(() => {
		setTitle(data.title);
		data.pub_date && setDate(data.pub_date);
	}, [data]);

	// Data for modal windows
	let dataForUpdateModal = {
		acceptButton: {
			text: 'Оновити',
			class: '',
			handler: updatePostHandler,
		},
		cencelButton: {
			text: 'Повернутися',
			handler: () => {
				setModalWidndovStatusUpdate(false);
				setFetchingStatus(false);
			},
		},
		closeButton: {
			text: 'Повернутися',
			handler: () => {
				setModalWidndovStatusUpdate(false);
				setFetchingStatus(false);
			},
			link: false,
		},
		isFetching: isFetching,
		fetchingResult: isFetchingStatus,
		text: {
			question: 'Оновити цю святкову дату?',
			accept: 'Святкову дату оновлено!',
			error: 'Сталася якась помилка!',
		},
	};
	let dataForDeleteModal = {
		acceptButton: {
			text: 'Видалити',
			class: 'delete',
			handler: deletePostHandler,
		},
		cencelButton: {
			text: 'Повернутися',
			handler: (e) => {
				setModalWidndovStatusDelete(false);
				setFetchingStatus(false);
			},
		},
		closeButton: {
			text: 'Повернутися',
			handler: (e) => {
				setModalWidndovStatusDelete(false);
				setFetchingStatus(false);
			},
			link: '/admin-holiday-calendar',
		},
		isFetching: isFetching,
		fetchingResult: isFetchingStatus,
		text: {
			question: 'Видалити цю святкову дату?',
			accept: 'Святкову дату видалено!',
			error: 'Сталася якась помилка!',
		},
	};

	return (
		<div className={`section-container`}>
			<form className={s.post}>
				<div className={s.post_item}>
					<p>
						Заголовок:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<textarea
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Заголовок"
						className={`${s.title} ${validationErrors.title ? s.validated : ''}`}></textarea>
				</div>

				<div className={`${s.post_item} ${s.row}`}>
					<p>
						Дата проведення:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<p className={`${s.date} ${validationErrors.date ? s.validated : ''}`}>
						<input type="datetime-local" step="1" onChange={(e) => setDate(e.target.value)} value={date} />
					</p>
				</div>

				<div className={s.select_buttons}>
					<Link to={'/admin-holiday-calendar/'} className={s.cancel}>
						Відмінити
					</Link>
					{data.id && (
						<button className={s.delete} onClick={deleteOpenMoalHandler}>
							Видалити
						</button>
					)}
					{Id ? (
						<button className={s.select} onClick={updateOpenMoalHandler}>
							Зберегти зміни
						</button>
					) : (
						<button className={s.select} onClick={creacteHandler}>
							Опублікувати
						</button>
					)}
				</div>
			</form>

			{modalWidndovStatus && (
				<ModalWidnow>
					<div className={s.result_window}>
						{isFetching ? (
							<Loader />
						) : (
							<div className={s.result_container}>
								{isFetchingStatus && isFetchingStatus !== 'error' && <p>Подія успішно створена!</p>}
								{isFetchingStatus === 'error' && <p>Упс! Вийшла якась помилка!</p>}
								<button
									onClick={() => {
										setModalWidndovStatus(false);
										setFetchingStatus(false);
									}}>
									Повернутися
								</button>
							</div>
						)}
					</div>
				</ModalWidnow>
			)}
			{modalWidndovStatusDelete && <AlertModalWindow data={dataForDeleteModal} />}
			{modalWidndovStatusUpdate && <AlertModalWindow data={dataForUpdateModal} />}
		</div>
	);
};

export default AdminHolidaysFormSection;
