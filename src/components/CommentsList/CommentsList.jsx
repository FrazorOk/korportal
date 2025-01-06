import { useEffect, useState } from 'react';
import s from './CommentsList.module.css';

const toDay = new Date().toJSON().slice(0, 10);

const CommentsList = ({ comment, fullScreen }) => {
	let [firstLoading, setFirstLoading] = useState(0);

	useEffect(() => {
		setFirstLoading((count) => count + 1);
	}, [comment]);

	useEffect(() => {
		if (firstLoading > 1) {
			setTimeout(() => {
				setFirstLoading(1);
			}, 1000);
		}
	}, [firstLoading]);

	return (
		<div className={`${s.commets_container} ${fullScreen && s.full_screen}`}>
			<p className={s.commets_h}>Коментарі:</p>
			<ul className={s.commets_list}>
				{comment &&
					comment.map(({ autor, post_date, comment_txt }, index) => {
						return (
							<li key={`comment${index}`} className={`${s.commets_item} ${index === 0 && firstLoading > 1 && s.active}`}>
								<p className={s.commets_title}>{autor && autor}</p>
								<p className={s.commets_date}>
									{post_date && toDay === post_date.slice(0, 10)
										? `Сьогодні ${post_date.slice(11, 16)}`
										: `${post_date.slice(8, 10)}-${post_date.slice(5, 7)}-${post_date.slice(0, 4)} ${post_date.slice(11, 16)}`}
								</p>
								<p className={s.commets_text}>{comment_txt && comment_txt}</p>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default CommentsList;
