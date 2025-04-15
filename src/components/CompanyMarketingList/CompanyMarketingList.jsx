import { Link } from 'react-router-dom';
import s from './CompanyMarketingList.module.css';
import EditAdminButton from '../UI/EditAdminButton/EditAdminButton';
import { dateConverterFromYMDFullMonth } from '../../helpers/dateConverter';

const CompanyMarketingList = ({ newsList, linkTo, admin, type }) => {
	return (
		<div className={s.news_list}>
			{newsList.length > 0 ? (
				newsList.map(
					(news) =>
						news && (
							<>
								<Link to={`/company-marketing-news/${linkTo}/${news.id}`} className={`${s.news_item} ${type === 'marketing' && s.yellow}`}>
									<div className={`${s.content}`}>
										{admin && (
											<EditAdminButton link={`/admin-company-marketing-news/add-change-company-marketing-news/${news.id}?type=${type}`} />
										)}
										<div className={s.image_container}>
											{(news.img[0].type = 'image' && <img className={s.image} src={news.img[0].url} alt="" />)}
										</div>
										<div className={s.text_container}>
											<p className={s.date}>
												{dateConverterFromYMDFullMonth(news.pub_date).day} {dateConverterFromYMDFullMonth(news.pub_date).month}{' '}
												{news.pub_date.slice(0, 4)}
											</p>
											<p className={s.title}>{news.title}</p>
											<p className={s.text}>{news.text}</p>
										</div>
									</div>
									<span className={s.hover_el}></span>
								</Link>
							</>
						)
				)
			) : (
				<p>Немає новин</p>
			)}
		</div>
	);
};

export default CompanyMarketingList;
