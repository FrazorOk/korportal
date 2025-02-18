import s from './AdminAddGalleryFormSection.module.css';
import deleteIcon from '../../../assets/img/icons/delete-icon.svg';
import { createNewCatalogGallery, deleteNewsPost, updateMarketingCompanyNewsPost } from '../../../api/api.js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors/userSelectors.js';
import ModalWidnow from '../../../components/UI/ModalWidnow/ModalWidnow.jsx';
import Loader from '../../../components/UI/Loader/Loader.jsx';
import { Link } from 'react-router-dom';
import AlertModalWindow from '../../../components/AlertModalWindow/AlertModalWindow.jsx';

let now = new Date(Date.now()).toLocaleString();
let formatedNow = `${now.slice(6, 10)}-${now.slice(3, 5)}-${now.slice(0, 2)}T${now.slice(12, now.length)}`;

const AdminAddGalleryFormSection = ({ Id, data }) => {
	let userID = useSelector(userSelector.userData);

	let [modalWidndovStatus, setModalWidndovStatus] = useState(false);
	let [modalWidndovStatusDelete, setModalWidndovStatusDelete] = useState(false);
	let [modalWidndovStatusUpdate, setModalWidndovStatusUpdate] = useState(false);

	let [isFetching, setFetching] = useState(false);
	let [isFetchingStatus, setFetchingStatus] = useState(false);

	let [title, setTitle] = useState('');
	let [date, setDate] = useState(formatedNow);
	let [images, setImages] = useState('');

	let [filesList, setFilesList] = useState(['']);
	let [fileIndex, setFilesIndex] = useState(['']);

	let [validationErrors, setValidationErrors] = useState({ title: false, date: false, images: false });

	// Functions
	const nulledAllInputs = () => {
		setTitle('');
		setDate('');
		setImages('');
		setFilesList(['']);
		setFilesIndex(['']);
	};
	const nulledAllValidations = () => {
		setValidationErrors({ title: false, date: false, images: false });
	};
	const validationForm = async () => {
		!title && setValidationErrors((obj) => ({ ...obj, title: true }));
		!date && setValidationErrors((obj) => ({ ...obj, date: true }));

		let filteredImgsList = filesList.filter((item) => item != false);

		filteredImgsList.length < 1 && setValidationErrors((obj) => ({ ...obj, images: true }));

		let imgStatus = false;
		if (filteredImgsList.length > 0) {
			imgStatus = true;
		}
		if (title && date && imgStatus) {
			return true;
		} else {
			return false;
		}
	};
	const fetchingNewPost = async (data) => {
		await setFetching(true);
		await setModalWidndovStatus(true);
		let result = await createNewCatalogGallery(data);
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
		let result = await updateMarketingCompanyNewsPost(data);
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
		let filteredImgsList = filesList.filter((item) => item != false);

		let dataFetching = {
			title: title,
			date: date,
			imgFile: filteredImgsList,
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

		let filteredDelImgsList = [];
		filesList.forEach((itemDelImg, indexDelIndex) => {
			if (`${itemDelImg}` == 'delimg') {
				filteredDelImgsList.push(data.img[indexDelIndex]);
			}
		});

		let filteredImgsList = filesList.filter((item) => {
			if (item != false && item != 'delimg') {
				return true;
			}
		});

		let dataFetching = {
			id: Id,
			title: title,
			date: date,
			imgFile: filteredImgsList,
			delimg: filteredDelImgsList,
			autor_id: userID.id,
		};

		let asyncFetchingAndValidation = async () => {
			let validationStatus = await validationForm();

			if (validationStatus) {
				nulledAllValidations();
				console.log(dataFetching);

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
		data.title && setTitle(data.title);
		data.pub_date && setDate(data.pub_date);
		data.img && setFilesList(data.img);
		data.img &&
			setFilesIndex((index) => {
				let currentIndex = [...index];

				for (let i = 0; i < data.img.length - 1; i++) {
					currentIndex = [...currentIndex, ''];
				}

				return currentIndex;
			});
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
			question: 'Оновити цю новину?',
			accept: 'Новину оновлено!',
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
			link: '/admin-gallery',
		},
		isFetching: isFetching,
		fetchingResult: isFetchingStatus,
		text: {
			question: 'Видалити цю новину?',
			accept: 'Новину видалено!',
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
						Дата публікації:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<p className={`${s.date} ${validationErrors.date ? s.validated : ''}`}>
						<input type="datetime-local" step="1" onChange={(e) => setDate(e.target.value)} value={date} />
					</p>
				</div>

				<div className={s.post_item}>
					<p>
						Зображення:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>

					{images && <img className={s.image_url} src={images} alt="" />}

					{fileIndex.map((itemImg, indexImg) => (
						<div
							key={`${indexImg}`}
							className={`${s.image_container} ${filesList[indexImg] === false || filesList[indexImg] === 'delimg' ? s.hidden : ''}`}>
							{filesList[indexImg] && !filesList[indexImg].name && filesList[indexImg] != 'delimg' ? (
								<div className={s.image_now_container}>
									<img className={s.image_now} src={filesList[indexImg]} alt="" />
									<button
										onClick={(e) => {
											e.preventDefault();
											setFilesList((filesItem) => {
												let fileItem = [...filesItem];
												fileItem[indexImg] = 'delimg';
												return fileItem;
											});
										}}
										className={s.image_now_del}
										title="Видалити">
										<img src={deleteIcon} alt="" />
									</button>
								</div>
							) : (
								<>
									<input
										onChange={(e) => {
											setFilesList((filesItem) => {
												let fileItem = [...filesItem];
												fileItem[indexImg] = e.target.files[0];
												return fileItem;
											});
										}}
										className={`${s.image} ${!images && validationErrors.images ? s.validated : ''}`}
										multiple
										type="file"
										name="myImage"
										placeholder="Оберіть зображення"
									/>
									<button
										onClick={(e) => {
											e.preventDefault();
											setFilesList((filesItem) => {
												let fileItem = [...filesItem];
												fileItem[indexImg] = false;
												return fileItem;
											});
										}}
										title="Видалити">
										<img src={deleteIcon} alt="" />
									</button>
								</>
							)}
						</div>
					))}
					<button
						className={s.image_add_input}
						onClick={(e) => {
							e.preventDefault();
							setFilesIndex((i) => [...i, '']);
						}}>
						Додати ще зображення
					</button>
				</div>

				<div className={s.select_buttons}>
					<Link to={'/admin-company-marketing-news'} className={s.cancel}>
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
export default AdminAddGalleryFormSection;
