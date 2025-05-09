import { useEffect, useRef, useState } from 'react';
import s from './NewsItemLow.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import heartIcon from '../../assets/img/icons/heart-icon.svg';
import commentsIcon from '../../assets/img/icons/comments-icon.svg';
import smileIcon from '../../assets/img/icons/smile-icon.svg';
import clockIcon from '../../assets/img/icons/clock-icon.svg';
import mailIcon from '../../assets/img/icons/paper-plane-icon.svg';
import CommentsList from '../CommentsList/CommentsList';
import { addIdToSeenNews, getNewsFromID, sendCommentNews, toggleLike } from '../../api/api';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import EmojiList from '../EmojiList/EmojiList';
import { Link } from 'react-router-dom';
import { fetchSeenNews } from '../../store/thunks';
import NewsImgSlider from '../NewsImgSlider/NewsImgSlider';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import EditAdminButton from '../UI/EditAdminButton/EditAdminButton';
import UserInfoModalBtn from '../UserInfoModalBtn/UserInfoModalBtn';
import ReactDOM from 'react-dom/client';
import store from '../../store/store';

const toDay = new Date().toJSON().slice(0, 10);

const NewsItemLow = ({ item, filterParams, adminStatus, fullScreen, viewed = false }) => {
	let ref = useRef();
	let refText = useRef();
	const dispatch = useDispatch();

	// select block
	let [selectorStatus, setSelectorStatus] = useState(false);
	let [copyLinkStatus, setCopyLinkStatus] = useState(false);

	let userSeenNews = useSelector(userSelector.userSeenNews);
	let user = useSelector(userSelector.userData);
	let { id, title, pub_date, tags, text, html, img, comment, reaction, views } = item;

	let [fetchedComments, setFetchedComments] = useState(null);
	let [commentsLength, setCommentsLenth] = useState(0);
	let [textAreaComment, setTextAreaComment] = useState('');

	let [reacionState, setReacionState] = useState(null);
	let [reacionStateLength, setReacionStateLenth] = useState(0);
	let [reacionStatus, setReacionStatus] = useState(false);

	let [currentViews, setCurrentViews] = useState(null);

	let [visibleStatus, toggleVisibleStatus] = useState(false);
	let [fetchingStatus, setFetchingStatus] = useState(false);
	let [smileStatus, setSmileStatus] = useState(false);
	let [isSeenStatus, setSeenStatus] = useState(false);

	// functions
	const findReactionStatus = (state1) => {
		if (state1) {
			let likeStatus = false;

			state1.forEach((el) => {
				if (el.UserCode && user.id && el.UserCode === user.id) {
					setReacionStatus(true);
					likeStatus = true;
				}
			});
			if (!likeStatus) {
				setReacionStatus(false);
			}
		} else {
			setReacionStatus(false);
		}
	};
	const changeIdSeenNews = async () => {
		let result = await addIdToSeenNews(id, user.id);
		result.status === 200 && dispatch(fetchSeenNews(user.id));
	};
	let changeViews = async () => {
		await changeIdSeenNews();
		let relustItem = await getNewsFromID(id, setFetchedComments, setReacionState);
		setCurrentViews(relustItem[0].views);
	};
	const uploadComments = async () => {
		setFetchingStatus(true);
		await getNewsFromID(id, setFetchedComments, setReacionState);
		setFetchingStatus(false);
		setTextAreaComment('');
		setSmileStatus(false);
	};
	const changeUserLinksToButtons = () => {
		setTimeout(() => {
			const linksInText = document.querySelectorAll(`._userLink`);
			console.log(linksInText);

			linksInText &&
				linksInText.length > 0 &&
				linksInText.forEach((linkInText) => {
					const exampleAttr1 = linkInText.getAttribute('title');
					const exampleAttr2 = linkInText.getAttribute('href');

					const container = document.createElement('span');
					linkInText.replaceWith(container);

					if (container) {
						const root = ReactDOM.createRoot(container);

						root.render(
							<Provider store={store}>
								<UserInfoModalBtn userId={exampleAttr2}>{exampleAttr1}</UserInfoModalBtn>
							</Provider>
						);
					}
				});
		}, 0);
	};

	useEffect(() => {
		if (viewed) {
			toggleVisibleStatus(true);
		} else {
			toggleVisibleStatus(false);
		}
	}, []);

	useEffect(() => {
		if (viewed && id && user.id && userSeenNews) {
			let seenStatus = false;
			userSeenNews.forEach((element) => {
				if (element == id) {
					seenStatus = true;
				}
			});

			if (!seenStatus) {
				changeViews();
			}
		}
	}, [id, user.id, userSeenNews]);

	useEffect(() => {
		if (text) {
			changeUserLinksToButtons();
		}
	}, [text]);

	// for close tab
	useEffect(() => {
		if (!viewed) {
			toggleVisibleStatus(false);
			setSmileStatus(false);
		}

		return () => {
			toggleVisibleStatus(false);
			setSmileStatus(false);
		};
	}, [filterParams]);

	// this item is seen?
	useEffect(() => {
		userSeenNews &&
			userSeenNews.forEach((element) => {
				if (element == id) {
					setSeenStatus(true);
				}
			});
	}, [userSeenNews]);

	// reactions
	useEffect(() => {
		setReacionState(reaction);
		findReactionStatus(reaction);
	}, [reaction]);
	useEffect(() => {
		!reacionState && setReacionStateLenth(0);
		reacionState && setReacionStateLenth(reacionState.length);
		reacionState && user && findReactionStatus(reacionState);
	}, [reacionState, user]);

	// comments
	useEffect(() => {
		setFetchedComments(comment);
	}, [comment]);
	useEffect(() => {
		fetchedComments && setCommentsLenth(fetchedComments.length);
		fetchedComments === null && setCommentsLenth(0);
	}, [fetchedComments]);
	useEffect(() => {
		views && setCurrentViews(views);
	}, [views]);

	// Remove user links
	useEffect(() => {
		changeUserLinksToButtons();
	}, [visibleStatus]);

	// Handlers
	let commentButtonOnClickHandler = (e) => {
		if (!visibleStatus) {
			toggleVisibleStatus(true);
		}
		if (!isSeenStatus) {
			let changeViews = async () => {
				await changeIdSeenNews();
				let relustItem = await getNewsFromID(id, setFetchedComments, setReacionState);
				setCurrentViews(relustItem[0].views);
			};

			changeViews();
		}

		setTimeout(() => {
			ref.current.focus();
		}, 100);
	};
	let sendCommetnButtonOnClickHandler = (e) => {
		let sendAndGetComments = async () => {
			setFetchingStatus(true);
			await sendCommentNews(id, user.id, textAreaComment, setFetchingStatus);
			await getNewsFromID(id, setFetchedComments, setReacionState);
			setFetchingStatus(false);
			setTextAreaComment('');
			setSmileStatus(false);
		};

		if (textAreaComment && textAreaComment.trim()) {
			sendAndGetComments();
		}
	};
	let addLikeButtonHandler = (e) => {
		let sendAndGetLikes = async () => {
			setFetchingStatus(true);
			await toggleLike(id, user.id, 'like');
			await getNewsFromID(id, setFetchedComments, setReacionState);
			setFetchingStatus(false);
		};
		sendAndGetLikes();
	};
	let removeLikeButtonHandler = (e) => {
		let sendAndGetLikes = async () => {
			setFetchingStatus(true);
			await toggleLike(id, user.id, '0');
			await getNewsFromID(id, setFetchedComments, setReacionState, id);
			setReacionStatus(false);
			setFetchingStatus(false);
		};

		sendAndGetLikes();
	};
	let onClickVisibleButtonHandler = () => {
		toggleVisibleStatus((status) => (visibleStatus = !status));
		setSmileStatus(false);
		if (!isSeenStatus) {
			changeViews();
		}
	};

	return (
		<div className={`${s.item} ${visibleStatus && s.active} ${fullScreen && s.full_screen}`}>
			{adminStatus && <EditAdminButton link={`./add-change-news/${id}`} />}

			<div className={s.left_column}>
				<p className={s.title}>
					<span>
						<Link
							className={s.title_link}
							title="Перейти"
							to={`/feed-news/feed-separate-news/${id}`}
							dangerouslySetInnerHTML={{ __html: title }}></Link>
					</span>
					<div
						ref={useOutsideClick(() => selectorStatus && setSelectorStatus(false) && setCopyLinkStatus(false))}
						className={s.selector_list}>
						<button
							title={selectorStatus ? 'Закрити' : 'Відкрити'}
							onClick={() => {
								setSelectorStatus((selector) => !selector);
								setCopyLinkStatus(false);
							}}>
							<span></span>
						</button>

						<ul className={`${s.selector_body} ${selectorStatus && s.active}`}>
							<li>
								<Link to={`/feed-news/feed-separate-news/${id}`}>Перейти</Link>
							</li>
							<li>
								<button
									onClick={() => {
										let inp = document.createElement('input');
										inp.value = `https://portal.softcom.ua/feed-news/feed-separate-news/${id}`;
										document.body.appendChild(inp);
										inp.select();

										if (document.execCommand('copy')) {
											setCopyLinkStatus(true);
										} else {
											setCopyLinkStatus(false);
										}

										document.body.removeChild(inp);
									}}>
									Копіювати посилання
								</button>
								{copyLinkStatus && <p style={{ color: 'green', fontSize: '12px', width: '100%', textAlign: 'center' }}>Скопійовано</p>}
							</li>
						</ul>
					</div>
				</p>
				<p className={s.date}>
					<img src={clockIcon} alt="" />
					{pub_date && toDay === pub_date.slice(0, 10)
						? `Сьогодні ${pub_date.slice(11, 16)}`
						: `${pub_date.slice(8, 10)}-${pub_date.slice(5, 7)}-${pub_date.slice(0, 4)} ${pub_date.slice(11, 16)}`}
				</p>
				<div className={s.tags}>
					{tags &&
						tags.map((item, index) => (
							<div key={index} style={{ backgroundColor: '#5182FE' }} className={s.tag}>
								<p>{item}</p>
							</div>
						))}
				</div>
				{visibleStatus && <p ref={refText} dangerouslySetInnerHTML={{ __html: text }} className={`${s.text}`} />}
			</div>
			<div className={s.right_column}>
				{img && visibleStatus && (
					<div className={s.images_container}>
						<NewsImgSlider img={img} fullScreen={fullScreen} />
					</div>
				)}

				<div className={s.buttons_container}>
					<div className={s.buttons_row}>
						<button
							title={'Подобається'}
							onClick={reacionStatus ? removeLikeButtonHandler : addLikeButtonHandler}
							disabled={fetchingStatus}
							className={`${s.likes_button} ${reacionStatus && s.liked}`}>
							<img src={heartIcon} alt="" />
							<p>{reacionStateLength}</p>
						</button>
						<button title={'Коментарі'} onClick={commentButtonOnClickHandler} className={s.coments_button}>
							<img src={commentsIcon} alt="" />
							<p>{commentsLength}</p>
							<p>Коментарі</p>
						</button>
					</div>
					<div>
						<p className={s.views}>Перегляди: {currentViews ? currentViews : '0'}</p>
					</div>
				</div>

				{visibleStatus && (
					<div className={s.commet_container}>
						{fetchedComments && <CommentsList comment={fetchedComments} fullScreen={fullScreen} uploadComments={uploadComments} />}
						<div className={s.coments_input}>
							<textarea
								value={textAreaComment}
								// onKeyDown={(e) => e.key === 'Enter' && sendCommetnButtonOnClickHandler(e)}
								onChange={(e) => setTextAreaComment(e.target.value)}
								ref={ref}
								placeholder="Ваш коментар..."
								name=""
								id=""></textarea>
							<div className={s.coments_input__btns}>
								<button title={'Смайлики'} disabled={fetchingStatus} onClick={() => setSmileStatus((status) => !status)}>
									<img src={smileIcon} alt="" />
								</button>
								<button title={'Додати коментар'} disabled={fetchingStatus} onClick={sendCommetnButtonOnClickHandler}>
									<img src={mailIcon} alt="" />
								</button>
							</div>
						</div>
						<EmojiList visibleStatus={smileStatus} setSmile={setTextAreaComment} />
					</div>
				)}
			</div>
			{!viewed && (
				<button title={visibleStatus ? 'Згорнути' : 'Розгорнути'} className={s.open_button} onClick={onClickVisibleButtonHandler}>
					<img src={arrowIcon} alt="" />
				</button>
			)}
		</div>
	);
};

export default NewsItemLow;
