import { Link } from 'react-router-dom';
import s from './CompanyMarketingList.module.css';

const CompanyMarketingList = ({ newsList }) => {
	return (
		<div className={s.news_list}>
			{newsList.map((news) => (
				<>
					<Link to="/" className={`${s.news_item}`}>
						<div className={`${s.content} section-container`}>
							<img src={news.img} alt="" />
							<div>
								<p className={s.title}>{news.title}</p>
								<p className={s.text}>{news.text}</p>
							</div>
						</div>
						<span className={s.hover_el}></span>
					</Link>
				</>
			))}
		</div>
	);
};

export default CompanyMarketingList;
