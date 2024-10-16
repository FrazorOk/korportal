import { useEffect } from 'react';
import s from './CommentsList.module.css';

const CommentsList = ({ comment }) => {
	useEffect(() => {
		console.log(comment);
	});

	return (
		<div className={s.commets_container}>
			<p className={s.commets_h}>Коментарі:</p>
			<ul className={s.commets_list}>
				{comment.map(({ autor, post_date, comment_txt }) => {
					return (
						<li className={s.commets_item}>
							<p className={s.commets_title}>{autor && autor}</p>
							<p className={s.commets_date}>{post_date && post_date}</p>
							<p className={s.commets_text}>{comment_txt && comment_txt}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default CommentsList;
