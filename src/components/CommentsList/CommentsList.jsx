import { useEffect, useState } from 'react';
import s from './CommentsList.module.css';
import { useMsal } from '@azure/msal-react';
import { getPhotoUser } from '../../api/graph';
import { loginRequest } from '../../authConfig';
import UserInfoModalBtn from '../UserInfoModalBtn/UserInfoModalBtn';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import delteIcon from '../../assets/img/icons/delete-icon.svg';
import { deleteNewsPost } from '../../api/api';

const toDay = new Date().toJSON().slice(0, 10);

const CommentsList = ({ comment, fullScreen, uploadComments }) => {
	const { instance, accounts } = useMsal();
	let user = useSelector(userSelector.userData);
	let [commentsList, setCommentsList] = useState([]);

	function RequestProfilePhoto(id) {
		return instance
			.acquireTokenSilent({
				...loginRequest,
				account: accounts[0],
			})
			.then((response) => {
				return getPhotoUser(response.accessToken, id)
					.then((response) => {
						if (response) {
							return response.blob();
						} else {
							return '';
						}
					})
					.then((result) => {
						const url = window.URL || window.webkitURL;
						const blobUrl = url.createObjectURL(result);

						if (result.type === 'application/json') {
							return '';
						}

						return blobUrl;
					})
					.catch((error) => console.log(error));
			});
	}

	let findVisibleUsers = async (array) => {
		let data = await Promise.all(
			array.map(async (item, index) => {
				let imgUrl = await RequestProfilePhoto(item.usercode);
				return { ...item, urlImg: imgUrl };
			})
		);
		setCommentsList(data);
		console.log(data);
	};

	useEffect(() => {
		comment && findVisibleUsers(comment);
	}, [comment]);

	const onClickDeleteHandler = (newsID) => {
		const deleteComment = async () => {
			let result = await deleteNewsPost(newsID, user.id, 'comments');
			if (result) uploadComments();
		};
		deleteComment();
	};

	return (
		<div className={`${s.commets_container} ${fullScreen && s.full_screen}`}>
			<p className={s.commets_h}>Коментарі:</p>
			<ul className={s.commets_list}>
				{commentsList &&
					commentsList.map(({ autor, post_date, comment_txt, urlImg, usercode, id }, index) => {
						return (
							<li key={`comment${index}`} className={`${s.commets_item}`}>
								{user && user.id === usercode && (
									<button className={s.delete_btn} onClick={() => onClickDeleteHandler(id)} title="Видалити коментар">
										<img src={delteIcon} alt="" />
									</button>
								)}
								<UserInfoModalBtn userId={usercode}>
									<div className={s.comment_user}>
										<img src={urlImg} alt="" />
										<div>
											<p className={s.commets_title}>{autor && autor}</p>
											<p className={s.commets_date}>
												{post_date && toDay === post_date.slice(0, 10)
													? `Сьогодні ${post_date.slice(11, 16)}`
													: `${post_date.slice(8, 10)}-${post_date.slice(5, 7)}-${post_date.slice(0, 4)} ${post_date.slice(11, 16)}`}
											</p>
										</div>
									</div>
								</UserInfoModalBtn>
								<p className={s.commets_text}>{comment_txt && comment_txt}</p>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default CommentsList;
