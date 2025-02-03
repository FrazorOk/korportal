import s from './NewsSection.module.css';
import imgEvent from '../../../assets/img/img-event.jpg';
import arrowLinkIcon from '../../../assets/img/icons/redirect-icon.svg';
import { Link } from 'react-router-dom';

const NewsList = ({ listTitle, activetab, data }) => {
	return (
		<div className={s.news_container}>
			<Link className="title_link" title="Перейти" to={`company-marketing-news?activetab=${activetab}`}>
				<h3>{listTitle}</h3>
				<img src={arrowLinkIcon} alt="" />
			</Link>

			{data && data.length > 0 ? (
				<div className={s.news_list}>
					{data.map(
						(newsItem, newsIndex) =>
							newsItem &&
							newsIndex < 3 && (
								<a href={`/company-marketing-news/marketing-separate-news/${newsItem.id}`} className={s.news_item}>
									<div>
										<img src={newsItem.img} alt="" />
									</div>
									<div className={s.news_item_content}>
										<p>{newsItem.title}</p>
										<p>{newsItem.text}</p>
									</div>
								</a>
							)
					)}
				</div>
			) : (
				<p style={{ marginTop: '20px', marginLeft: '18px', marginBottom: '10px', color: '#7d7d7d' }}>Немає новин</p>
			)}
		</div>
	);
};

export default NewsList;
