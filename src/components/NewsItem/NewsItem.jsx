import { useEffect, useRef, useState } from 'react';
import s from './NewsItem.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import heartIcon from '../../assets/img/icons/heart-icon.svg';
import commentsIcon from '../../assets/img/icons/comments-icon.svg';
import mailIcon from '../../assets/img/icons/mail_gray_icon.svg';
import CommentsList from '../CommentsList/CommentsList';
import { getNewsFromID, sendCommentNews } from '../../api/api';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';

const NewsItem = ({ item }) => {
	let ref = useRef();

	let user = useSelector(userSelector.userData);
	let { id, title, pub_date, tags, text, img, comment } = item;
	let [visibleStatus, toggleVisibleStatus] = useState(false);
	let [fetchedComments, setFetchedComments] = useState(null);
	let [commentsLength, setCommentsLenth] = useState(0);
	let [fetchingStatus, setFetchingStatus] = useState(false);

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
		let text = ref.current.value;

		let sendAndGetComments = async () => {
			await sendCommentNews(id, user.id, text, setFetchingStatus);
			await getNewsFromID(setFetchedComments, id);
			ref.current.value = '';
		};

		sendAndGetComments();
	};

	return (
		<div className={`${s.item} ${visibleStatus && s.active}`}>
			<div className={s.left_column}>
				<p className={s.title}>{title && title}</p>
				<p className={s.date}>{pub_date && pub_date}</p>
				<div className={s.tags}>
					{tags &&
						tags.map((item, index) => (
							<div key={index} style={item === 'День стажу' && { backgroundColor: '#5182FE' }} className={s.tag}>
								<p>{item}</p>
							</div>
						))}
				</div>
				<p className={`${s.text}`}>{text && text}</p>
			</div>
			<div className={s.right_column}>
				<div className={s.images_container}>
					<img src={img} alt="" />
				</div>
				<div className={s.buttons_container}>
					<button className={s.likes_button}>
						<img src={heartIcon} alt="" />
						<p>0</p>
					</button>
					<button onClick={commentButtonOnClickHandler} className={s.coments_button}>
						<img src={commentsIcon} alt="" />
						<p>{commentsLength}</p>
					</button>
				</div>
				<div className={s.commet_container}>
					{comment && <CommentsList comment={fetchedComments} />}
					<div className={s.coments_input}>
						<textarea ref={ref} placeholder="Ваш коментар..." name="" id=""></textarea>
						<button onClick={sendCommetnButtonOnClickHandler}>
							<img src={mailIcon} alt="" />
						</button>
					</div>
				</div>
			</div>
			<button className={s.open_button} onClick={(e) => toggleVisibleStatus((status) => (visibleStatus = !status))}>
				<img src={arrowIcon} alt="" />
			</button>
		</div>
	);
};

export default NewsItem;