import s from './NewsSection.module.css';
import arrowLinkIcon from '../../../assets/img/icons/redirect-icon.svg';
import { Link } from 'react-router-dom';
import { dateConverterFromYMDFullMonth } from '../../../helpers/dateConverter';

const NewsList = ({ listTitle, activetab, data, type }) => {
	return (
		<div className={s.news_container}>
			<Link className="title_link" title="Перейти" to={`company-marketing-news?activetab=${activetab}`}>
				<h3>{listTitle}</h3>
				<img className={s.icon_link} src={arrowLinkIcon} alt="" />
			</Link>

			{data && data.length > 0 ? (
				<div className={s.news_list}>
					{data.map(
						(newsItem, newsIndex) =>
							newsItem &&
							newsIndex < 2 && (
								<a
									href={`/company-marketing-news/${type === 'marketing' ? 'marketing-separate-news' : 'company-separate-news'}/${
										newsItem.id
									}`}
									className={`${s.news_item} ${type === 'marketing' && s.yellow}`}>
									<div className={s.item_img_container}>
										<img src={newsItem.img} alt="" />
									</div>
									<div className={s.news_item_content}>
										<p className={s.date}>
											{dateConverterFromYMDFullMonth(newsItem.pub_date).day} {dateConverterFromYMDFullMonth(newsItem.pub_date).month}{' '}
											{newsItem.pub_date.slice(0, 4)}
										</p>
										<p>{newsItem.title}</p>
										<p>{newsItem.text}</p>
									</div>
								</a>
							)
					)}
					{data && data.length < 3 && (
						<div
							style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
							className={`${s.news_item} ${type === 'marketing' && s.yellow} ${s.none_item}`}>
							<p style={{ textAlign: 'center', fontSize: '22px', color: 'rgb(187 187 187)', fontWeight: '600' }}>Поки немає інших новин</p>
						</div>
					)}
				</div>
			) : (
				<div
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
					className={`${s.news_item} ${type === 'marketing' && s.yellow}`}>
					<p style={{ textAlign: 'center', fontSize: '22px', color: 'rgb(187 187 187)', fontWeight: '600' }}>Поки немає інших новин</p>
				</div>
			)}
		</div>
	);
};

export default NewsList;
