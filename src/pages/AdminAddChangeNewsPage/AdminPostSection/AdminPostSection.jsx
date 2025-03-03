import s from './AdminPostSection.module.css';
import smileIcon from '../../../assets/img/icons/smile-icon.svg';
import deleteIcon from '../../../assets/img/icons/delete-icon.svg';
import EmojiList from '../../../components/EmojiList/EmojiList';
import { createNewPost, deleteNewsPost, updateNewsPost } from '../../../api/api.js';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../selectors/userSelectors.js';
import ModalWidnow from '../../../components/UI/ModalWidnow/ModalWidnow.jsx';
import Loader from '../../../components/UI/Loader/Loader.jsx';
import { Link } from 'react-router-dom';
import AlertModalWindow from '../../../components/AlertModalWindow/AlertModalWindow.jsx';

let now = new Date(Date.now()).toLocaleString();
let formatedNow = `${now.slice(6, 10)}-${now.slice(3, 5)}-${now.slice(0, 2)}T${now.slice(12, now.length)}`;

const AdminPostSection = ({ newsId, data }) => {
	let userID = useSelector(userSelector.userData);

	let [visibleStatus, setVisibleStatus] = useState(false);
	let [visibleStatus2, setVisibleStatus2] = useState(false);

	let [modalWidndovStatus, setModalWidndovStatus] = useState(false);
	let [modalWidndovStatusDelete, setModalWidndovStatusDelete] = useState(false);
	let [modalWidndovStatusUpdate, setModalWidndovStatusUpdate] = useState(false);
	let [modalWidndovStatusDeleteComment, setModalWidndovStatusDeleteComment] = useState(false);

	let [isFetching, setFetching] = useState(false);
	let [isFetchingStatus, setFetchingStatus] = useState(false);

	let [title, setTitle] = useState('');
	let [date, setDate] = useState(formatedNow);
	let [text, setText] = useState('');
	let [tags, setTags] = useState('');
	let [images, setImages] = useState('');
	let [comment, setComment] = useState([]);
	let [willDeleteComment, setWillDeleteComment] = useState(null);

	let [filesList, setFilesList] = useState(['']);
	let [fileIndex, setFilesIndex] = useState(['']);

	let [validationErrors, setValidationErrors] = useState({ title: false, date: false, text: false, images: false });

	// Functions
	const nulledAllInputs = () => {
		setTitle('');
		setDate('');
		setText('');
		setTags('');
		setImages('');
		setComment([]);
		setFilesList(['']);
		setFilesIndex(['']);
	};
	const nulledAllValidations = () => {
		setValidationErrors({ title: false, date: false, text: false, images: false });
	};
	const validationForm = async () => {
		!title && setValidationErrors((obj) => ({ ...obj, title: true }));
		!date && setValidationErrors((obj) => ({ ...obj, date: true }));
		!text && setValidationErrors((obj) => ({ ...obj, text: true }));
		let filteredImgsList = filesList.filter((item) => item != false);

		filteredImgsList.length < 1 && setValidationErrors((obj) => ({ ...obj, images: true }));

		let imgStatus = false;
		if (filteredImgsList.length > 0) {
			imgStatus = true;
		}
		if (title && date && text && imgStatus) {
			return true;
		} else {
			return false;
		}
	};
	const fetchingNewPost = async (data) => {
		await setFetching(true);
		await setModalWidndovStatus(true);
		let result = await createNewPost(data);
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
		let result = await deleteNewsPost(newsId);
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
	const fetchingDeleteComment = async () => {
		await setFetching(true);
		let result = await deleteNewsPost(willDeleteComment, 'comments');
		await setFetching(false);
		if (result.status == 200) {
			setFetchingStatus(true);
			let filteredComments = comment.filter((item) => item.id != willDeleteComment);
			setComment(filteredComments);
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
			tags: tags.split(', '),
			date: date,
			text: text,
			html: text,
			imgFile: filteredImgsList,
			cat_id: 1,
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
			id: newsId,
			title: title,
			tags: tags.split(', '),
			date: date,
			text: text,
			html: text,
			imgFile: filteredImgsList,
			delimg: filteredDelImgsList,
			cat_id: 1,
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
	const deleteCommentHandler = (e) => {
		e.preventDefault();

		let asyncFetchingAndValidation = async () => {
			await fetchingDeleteComment();
		};

		asyncFetchingAndValidation();
	};

	// Effects

	useEffect(() => {
		data.title && setTitle(data.title);
		data.pub_date && setDate(data.pub_date);
		data.tags && data.tags.length > 0 && setTags(data.tags.join(', '));
		data.text && setText(data.text);
		data.comment && setComment(data.comment);
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
			question: 'Оновити цю подію?',
			accept: 'Подію оновлено!',
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
			link: '/admin-news-feed',
		},
		isFetching: isFetching,
		fetchingResult: isFetchingStatus,
		text: {
			question: 'Видалити цю подію?',
			accept: 'Подію видалено!',
			error: 'Сталася якась помилка!',
		},
	};
	let dataForDeleteCommentModal = {
		acceptButton: {
			text: 'Видалити',
			class: 'delete',
			handler: deleteCommentHandler,
		},
		cencelButton: {
			text: 'Повернутися',
			handler: (e) => {
				setModalWidndovStatusDeleteComment(false);
				setFetchingStatus(false);
			},
		},
		closeButton: {
			text: 'Повернутися',
			handler: (e) => {
				setModalWidndovStatusDeleteComment(false);
				setFetchingStatus(false);
			},
			link: false,
		},
		isFetching: isFetching,
		fetchingResult: isFetchingStatus,
		text: {
			question: 'Видалити цей коментар?',
			accept: 'Коментар видалено!',
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
					<p>Теги:</p>
					<input placeholder="Теги, Теги, ..." type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
				</div>

				<div className={s.post_item}>
					<p>
						Текст події:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Текст події"
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
										accept="image/*"
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

				{comment && comment.length > 0 ? (
					<div className={s.post_item}>
						<p>Коментарі:</p>
						<div className={s.comments_list}>
							{comment.map((item) => (
								<div className={s.comment}>
									<div className={s.comment_column}>
										<p style={{ color: '#004795' }}>{item.autor}</p>
										<p style={{ color: '#7d7d7d', fontSize: '12px' }}>{item.post_date}</p>
										<p>{item.comment_txt}</p>
									</div>
									<button
										onClick={(e) => {
											e.preventDefault();

											setWillDeleteComment(item.id);
											setModalWidndovStatusDeleteComment(true);
										}}
										title="Видалити коментар">
										<img src={deleteIcon} alt="" />
									</button>
								</div>
							))}
						</div>
					</div>
				) : (
					''
				)}

				<div className={s.select_buttons}>
					<Link to={'/admin-news-feed/'} className={s.cancel}>
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
			{modalWidndovStatusDeleteComment && <AlertModalWindow data={dataForDeleteCommentModal} />}
		</div>
	);
};

export default AdminPostSection;
