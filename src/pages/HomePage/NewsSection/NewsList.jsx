import s from './NewsSection.module.css';
import imgEvent from '../../../assets/img/img-event.jpg';

const NewsList = ({ listTitle }) => {
	return (
		<div className={s.news_container}>
			<h3>{listTitle}</h3>

			<div className={s.news_list}>
				<a href="#" className={s.news_item}>
					<div>
						<img src={imgEvent} alt="" />
					</div>
					<div className={s.news_item_content}>
						<p>День програміста</p>
						<p>Опис</p>
					</div>
				</a>
				<a href="#" className={s.news_item}>
					<div>
						<img src={imgEvent} alt="" />
					</div>
					<div className={s.news_item_content}>
						<p>День програміста</p>
						<p>Опис</p>
					</div>
				</a>
				<a href="#" className={s.news_item}>
					<div>
						<img src={imgEvent} alt="" />
					</div>
					<div className={s.news_item_content}>
						<p>День програміста</p>
						<p>Опис</p>
					</div>
				</a>
			</div>
		</div>
	);
};

export default NewsList;
