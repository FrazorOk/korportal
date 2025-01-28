import s from './NewsSection.module.css';
import imgEvent from '../../../assets/img/img-event.jpg';
import arrowLinkIcon from '../../../assets/img/icons/redirect-icon.svg';
import { Link } from 'react-router-dom';

const NewsList = ({ listTitle }) => {
	return (
		<div className={s.news_container}>
			<Link className="title_link" title="Перейти" to="company-marketing-news">
				<h3>{listTitle}</h3>
				<img src={arrowLinkIcon} alt="" />
			</Link>

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
