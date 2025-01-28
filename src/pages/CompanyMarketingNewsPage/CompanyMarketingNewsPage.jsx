import CompanyMarketingList from '../../components/CompanyMarketingList/CompanyMarketingList';
import { useScrollToTop } from '../../hooks/scrollToTop';

const newsList = [
	{
		img: 'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
		title: 'title',
		text: 'text',
	},
	{
		img: 'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
		title: 'title',
		text: 'text',
	},
	{
		img: 'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
		title: 'title',
		text: 'text',
	},
	{
		img: 'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
		title: 'title',
		text: 'text',
	},
	{
		img: 'https://portal.softcom.ua/content/pictures/news/115/0_9a04a7a25c3ffa24f9710eed855303b4.webp',
		title: 'title',
		text: 'text',
	},
];

const CompanyMarketingNewsPage = () => {
	useScrollToTop();

	return (
		<div>
			<div className="row">
				<div className="column-50">
					<h1>Новини маркетингу</h1>
					<div className="row">
						<CompanyMarketingList newsList={newsList} />
					</div>
				</div>
				<div className="column-50">
					<h1>Новини компанії</h1>
					<div className="row">
						<CompanyMarketingList newsList={newsList} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompanyMarketingNewsPage;
