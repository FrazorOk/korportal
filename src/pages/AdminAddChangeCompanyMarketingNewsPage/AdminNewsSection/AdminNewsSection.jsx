import s from './AdminNewsSection.module.css';
import smileIcon from '../../../assets/img/icons/smile-icon.svg';
import deleteIcon from '../../../assets/img/icons/delete-icon.svg';
import EmojiList from '../../../components/EmojiList/EmojiList';
import { createMarketingCompanyNewPost, deleteNewsPost, updateMarketingCompanyNewsPost } from '../../../api/api.js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors/userSelectors.js';
import ModalWidnow from '../../../components/UI/ModalWidnow/ModalWidnow.jsx';
import Loader from '../../../components/UI/Loader/Loader.jsx';
import { Link } from 'react-router-dom';
import AlertModalWindow from '../../../components/AlertModalWindow/AlertModalWindow.jsx';

let now = new Date(Date.now()).toLocaleString();
let formatedNow = `${now.slice(6, 10)}-${now.slice(3, 5)}-${now.slice(0, 2)}T${now.slice(12, now.length)}`;

const AdminNewsSection = ({ newsId, data, type }) => {
	let userID = useSelector(userSelector.userData);

	let [visibleStatus, setVisibleStatus] = useState(false);
	let [visibleStatus2, setVisibleStatus2] = useState(false);

	let [modalWidndovStatus, setModalWidndovStatus] = useState(false);
	let [modalWidndovStatusDelete, setModalWidndovStatusDelete] = useState(false);
	let [modalWidndovStatusUpdate, setModalWidndovStatusUpdate] = useState(false);

	let [isFetching, setFetching] = useState(false);
	let [isFetchingStatus, setFetchingStatus] = useState(false);

	let [title, setTitle] = useState('');
	let [date, setDate] = useState(formatedNow);
	let [text, setText] = useState('');
	let [htmlBody, setHtmlBody] = useState('');
	let [images, setImages] = useState('');

	let [filesList, setFilesList] = useState(['']);
	let [fileIndex, setFilesIndex] = useState(['']);

	let [validationErrors, setValidationErrors] = useState({ title: false, date: false, text: false, htmlBody: false, images: false });

	// Functions
	const nulledAllInputs = () => {
		setTitle('');
		setDate('');
		setText('');
		setHtmlBody('');
		setImages('');
		setFilesList(['']);
		setFilesIndex(['']);
	};
	const nulledAllValidations = () => {
		setValidationErrors({ title: false, date: false, text: false, htmlBody: false, images: false });
	};
	const validationForm = async () => {
		!title && setValidationErrors((obj) => ({ ...obj, title: true }));
		!date && setValidationErrors((obj) => ({ ...obj, date: true }));
		!text && setValidationErrors((obj) => ({ ...obj, text: true }));
		!htmlBody && setValidationErrors((obj) => ({ ...obj, htmlBody: true }));

		let filteredImgsList = filesList.filter((item) => item != false);

		filteredImgsList.length < 1 && setValidationErrors((obj) => ({ ...obj, images: true }));

		let imgStatus = false;
		if (filteredImgsList.length > 0) {
			imgStatus = true;
		}
		if (title && date && text && htmlBody && imgStatus) {
			return true;
		} else {
			return false;
		}
	};
	const fetchingNewPost = async (data) => {
		await setFetching(true);
		await setModalWidndovStatus(true);
		let result = await createMarketingCompanyNewPost(data);
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

		let result = await deleteNewsPost(newsId, userID.id);
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
			text: text,
			html: htmlBody,
			imgFile: filteredImgsList,
			cat_id: type === 'marketing' ? 3 : 4,
			autor_id: userID.id,
		};

		let asyncFetchingAndValidation = async () => {
			let validationStatus = await validationForm();

			if (validationStatus) {
				nulledAllValidations();

				console.log(dataFetching);

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
			id: newsId,
			title: title,
			date: date,
			text: text,
			html: htmlBody,
			imgFile: filteredImgsList,
			delimg: filteredDelImgsList,
			cat_id: type === 'marketing' ? 3 : 4,
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
		data.text && setText(data.text);
		data.html && setHtmlBody(data.html);
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
			link: '/admin-company-marketing-news',
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
					<button
						title="Смайлики"
						onClick={(e) => {
							e.preventDefault();
							setVisibleStatus((status) => !status);
						}}
						className={s.smile_button}>
						<img src={smileIcon} alt="" />
					</button>
					<EmojiList visibleStatus={visibleStatus} setSmile={setTitle} />
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
						Опис новини:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Опис новини"
						className={`${s.text} ${validationErrors.text ? s.validated : ''}`}></textarea>
					<button
						title="Смайлики"
						onClick={(e) => {
							e.preventDefault();
							setVisibleStatus2((status) => !status);
						}}
						className={s.smile_button}>
						<img src={smileIcon} alt="" />
					</button>
					<EmojiList visibleStatus={visibleStatus2} setSmile={setText} />
				</div>

				<div className={s.post_item}>
					<p>
						Тіло новини:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<textarea
						value={htmlBody}
						onChange={(e) => setHtmlBody(e.target.value)}
						placeholder="Тіло новини"
						className={`${s.text} ${validationErrors.htmlBody ? s.validated : ''}`}></textarea>
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
					{newsId ? (
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
								<a className={s.select} href="/admin-company-marketing-news/">
									Повернутися
								</a>
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

export default AdminNewsSection;
