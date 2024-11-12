import { useEffect, useRef, useState } from 'react';
import s from './NewsItem.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import heartIcon from '../../assets/img/icons/heart-icon.svg';
import commentsIcon from '../../assets/img/icons/comments-icon.svg';
import changeIcon from '../../assets/img/icons/pencil-icon.svg';
import deleteIcon from '../../assets/img/icons/delete-icon.svg';
import smileIcon from '../../assets/img/icons/smile-icon.svg';
import clockIcon from '../../assets/img/icons/clock-icon.svg';
import mailIcon from '../../assets/img/icons/mail_gray_icon.svg';
import CommentsList from '../CommentsList/CommentsList';
import { addIdToSeenNews, getNewsFromID, sendCommentNews, toggleLike } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import EmojiList from '../EmojiList/EmojiList';
import { Link } from 'react-router-dom';
import { fetchSeenNews } from '../../store/thunks';

const toDay = new Date().toJSON().slice(0, 10);

const NewsItem = ({ item, filterParams, adminStatus }) => {
	let ref = useRef();
	const dispatch = useDispatch();

	let userSeenNews = useSelector(userSelector.userSeenNews);
	let user = useSelector(userSelector.userData);
	let { id, title, pub_date, tags, text, img, comment, reaction } = item;

	let [fetchedComments, setFetchedComments] = useState(null);
	let [commentsLength, setCommentsLenth] = useState(0);
	let [textAreaComment, setTextAreaComment] = useState('');

	let [reacionState, setReacionState] = useState(null);
	let [reacionStateLength, setReacionStateLenth] = useState(0);
	let [reacionStatus, setReacionStatus] = useState(false);

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
		console.log('change');

		let result = await addIdToSeenNews(id, user.id);
		result.status === 200 && dispatch(fetchSeenNews(user.id));
	};

	// for close tab
	useEffect(() => {
		toggleVisibleStatus(false);
		setSmileStatus(false);

		return () => {
			toggleVisibleStatus(false);
			setSmileStatus(false);
		};
	}, [filterParams]);

	// this item is seen?
	useEffect(() => {
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
	}, [fetchedComments]);

	// Handlers
	let commentButtonOnClickHandler = (e) => {
		if (!visibleStatus) {
			toggleVisibleStatus(true);
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
		sendAndGetComments();
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

	return (
		<div className={`${s.item} ${visibleStatus && s.active}`}>
			{adminStatus && (
				<div className={s.admin_btns}>
					<Link to={`./add-change-news/${id}`} title="Редагувати">
						<img src={changeIcon} alt="" />
					</Link>
					<Link title="Видалити">
						<img src={deleteIcon} alt="" />
					</Link>
				</div>
			)}
			<div className={s.left_column}>
				<p className={s.title}>{title && title}</p>
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
				{text && <p dangerouslySetInnerHTML={{ __html: text }} className={`${s.text}`} />}
			</div>
			<div className={s.right_column}>
				<div className={s.images_container}>
					<img src={img} alt="" />
				</div>
				<div className={s.buttons_container}>
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
					</button>
				</div>
				<div className={s.commet_container}>
					{fetchedComments && <CommentsList comment={fetchedComments} />}
					<div className={s.coments_input}>
						<textarea
							value={textAreaComment}
							onKeyDown={(e) => e.key === 'Enter' && sendCommetnButtonOnClickHandler(e)}
							onChange={(e) => setTextAreaComment(e.target.value)}
							ref={ref}
							placeholder="Ваш коментар..."
							name=""
							id=""></textarea>
						<div className={s.coments_input__btns}>
							<button title={'Додати коментар'} disabled={fetchingStatus} onClick={sendCommetnButtonOnClickHandler}>
								<img src={mailIcon} alt="" />
							</button>
							<button title={'Смайлики'} disabled={fetchingStatus} onClick={() => setSmileStatus((status) => !status)}>
								<img src={smileIcon} alt="" />
							</button>
						</div>
					</div>
					<EmojiList visibleStatus={smileStatus} setSmile={setTextAreaComment} />
				</div>
			</div>
			<button
				title={visibleStatus ? 'Згорнути' : 'Розгорнути'}
				className={s.open_button}
				onClick={(e) => {
					toggleVisibleStatus((status) => (visibleStatus = !status));
					setSmileStatus(false);
					!isSeenStatus && changeIdSeenNews();
				}}>
				<img src={arrowIcon} alt="" />
			</button>
		</div>
	);
};

export default NewsItem;
