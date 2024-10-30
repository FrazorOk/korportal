import { useEffect, useRef, useState } from 'react';
import s from './NewsItem.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import heartIcon from '../../assets/img/icons/heart-icon.svg';
import commentsIcon from '../../assets/img/icons/comments-icon.svg';
// import mailIcon from '../../assets/img/icons/send-arrow-icon.svg';
import smileIcon from '../../assets/img/icons/smile-icon.svg';
import clockIcon from '../../assets/img/icons/clock-icon.svg';
import mailIcon from '../../assets/img/icons/mail_gray_icon.svg';
import CommentsList from '../CommentsList/CommentsList';
import { getNewsFromID, sendCommentNews, toggleLike } from '../../api/api';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import EmojiList from '../EmojiList/EmojiList';

const NewsItem = ({ item }) => {
	let ref = useRef();

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

	const findReactionStatus = (state1) => {
		if (state1) {
			state1.forEach((el) => {
				console.log(user.id);
				console.log(el.UserCode);
				if (el.UserCode === user.id) {
					console.log('find true');

					setReacionStatus(true);
				}
			});
		}
	};
	useEffect(() => {
		setReacionState(reaction);
		findReactionStatus(reaction);
	}, [reaction]);
	useEffect(() => {
		!reacionState && setReacionStateLenth(0);
		reacionState && setReacionStateLenth(reacionState.length);
		reacionState && user && findReactionStatus(reacionState);
	}, [reacionState, user]);

	useEffect(() => {
		setFetchedComments(comment);
	}, [comment]);
	useEffect(() => {
		fetchedComments && setCommentsLenth(fetchedComments.length);
	}, [fetchedComments]);

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
			await getNewsFromID(setFetchedComments, false, id);
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
			await getNewsFromID(false, setReacionState, id);
			setFetchingStatus(false);
		};
		sendAndGetLikes();
	};
	let removeLikeButtonHandler = (e) => {
		let sendAndGetLikes = async () => {
			setFetchingStatus(true);
			await toggleLike(id, user.id, '0');
			await getNewsFromID(false, setReacionState, id);
			setReacionStatus(false);
			setFetchingStatus(false);
		};

		sendAndGetLikes();
	};

	return (
		<div className={`${s.item} ${visibleStatus && s.active}`}>
			<div className={s.left_column}>
				<p className={s.title}>{title && title}</p>
				<p className={s.date}>
					<img src={clockIcon} alt="" /> {pub_date && pub_date}
				</p>
				<div className={s.tags}>
					{tags &&
						tags.map((item, index) => (
							<div key={index} style={item === 'День стажу' && { backgroundColor: '#5182FE' }} className={s.tag}>
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
						onClick={reacionStatus ? removeLikeButtonHandler : addLikeButtonHandler}
						disabled={fetchingStatus}
						className={`${s.likes_button} ${reacionStatus && s.liked}`}>
						<img src={heartIcon} alt="" />
						<p>{reacionStateLength}</p>
					</button>
					<button onClick={commentButtonOnClickHandler} className={s.coments_button}>
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
							<button disabled={fetchingStatus} onClick={sendCommetnButtonOnClickHandler}>
								<img src={mailIcon} alt="" />
							</button>
							<button disabled={fetchingStatus} onClick={() => setSmileStatus((status) => !status)}>
								<img src={smileIcon} alt="" />
							</button>
						</div>
					</div>
					<EmojiList visibleStatus={smileStatus} setSmile={setTextAreaComment} />
				</div>
			</div>
			<button
				className={s.open_button}
				onClick={(e) => {
					toggleVisibleStatus((status) => (visibleStatus = !status));
					setSmileStatus(false);
				}}>
				<img src={arrowIcon} alt="" />
			</button>
		</div>
	);
};

export default NewsItem;
