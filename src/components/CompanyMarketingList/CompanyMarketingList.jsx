import { Link } from 'react-router-dom';
import s from './CompanyMarketingList.module.css';
import EditAdminButton from '../UI/EditAdminButton/EditAdminButton';

const CompanyMarketingList = ({ newsList, linkTo, admin, type }) => {
	return (
		<div className={s.news_list}>
			{newsList.length > 0 ? (
				newsList.map(
					(news) =>
						news && (
							<>
								<Link to={`/company-marketing-news/${linkTo}/${news.id}`} className={`${s.news_item}`}>
									<div className={`${s.content} section-container`}>
										{admin && (
											<EditAdminButton link={`/admin-company-marketing-news/add-change-company-marketing-news/${news.id}?type=${type}`} />
										)}
										<img className={s.image} src={news.img} alt="" />
										<div className={s.text_container}>
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
