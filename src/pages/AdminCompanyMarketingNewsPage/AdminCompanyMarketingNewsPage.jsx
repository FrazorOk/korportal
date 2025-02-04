import { useSearchParams } from 'react-router-dom';
import CompanyMarketingList from '../../components/CompanyMarketingList/CompanyMarketingList';
import Tabs from '../../components/UI/Tabs/Tabs';
import { useScrollToTop } from '../../hooks/scrollToTop';
import { useEffect, useState } from 'react';
import AddEventButton from '../../components/UI/AddEventButton/AddEventButton';
import { getNews } from '../../api/api';

const AdminCompanyMarketingNewsPage = () => {
	useScrollToTop();

	const [searchParams, setSearchParams] = useSearchParams();

	let [marketingData, setMarketingData] = useState([]);
	let [companyData, setCompanyData] = useState([]);
	let [tabIndex, setTabIndex] = useState(0);

	const tabsTitles = ['Новини маркетингу', 'Новини компанії'];
	const tabsItems = [
		<>
			<div title="Створити новину маркетингу" style={{ width: '100%', height: '55px' }}>
				<AddEventButton path={'add-change-company-marketing-news?type=marketing'} />
			</div>
			<CompanyMarketingList admin={true} newsList={marketingData} linkTo="marketing-separate-news" type="marketing" />
		</>,
		<>
			<div title="Створити новину компанії" style={{ width: '100%', height: '55px' }}>
				<AddEventButton path={'add-change-company-marketing-news?type=company'} />
			</div>
			<CompanyMarketingList admin={true} newsList={companyData} linkTo="company-separate-news" type="company" />
		</>,
	];

	useEffect(() => {
		getNews(setMarketingData, 1, 3);
		getNews(setCompanyData, 1, 4);
		let interval = setInterval(() => {
			getNews(setMarketingData, 1, 3);
			getNews(setCompanyData, 1, 4);
		}, 300000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		let startedTab = searchParams.get('activetab');
		if (startedTab && startedTab > -1 && startedTab < tabsItems.length) setTabIndex(startedTab * 1);
	}, [searchParams]);

	return (
		<>
			{/* Mobile */}
			<div className="mobile">
				<h1>Налаштування новини маркетингу та компанії</h1>
				<div className="row">
					<div style={{ maxWidth: '580px', width: '100%' }}>
						<Tabs titleTabs={tabsTitles} setIndex={setTabIndex} tabIndex={tabIndex} />
					</div>
					{tabsItems.map((tabItem, itemIndex) => {
						if (itemIndex === tabIndex) {
							return tabItem;
						}
					})}
				</div>
			</div>

			{/* Desktop */}
			<div className="desktop">
				<div style={{ marginTop: '0' }} className="row">
					<div className="column-50">
						<h1>Налаштування новини маркетингу</h1>
						<div title="Створити новину маркетингу" style={{ maxWidth: '580px', width: '100%', height: '60px' }}>
							<AddEventButton path={'add-change-company-marketing-news?type=marketing'} />
						</div>
						<CompanyMarketingList admin={true} newsList={marketingData} linkTo="marketing-separate-news" type="marketing" />
					</div>
					<div className="column-50">
						<h1>Налаштування новини компанії</h1>
						<div title="Створити новину компанії" style={{ maxWidth: '580px', width: '100%', height: '60px' }}>
							<AddEventButton path={'add-change-company-marketing-news?type=company'} />
						</div>
						<CompanyMarketingList admin={true} newsList={companyData} linkTo="company-separate-news" type="company" />
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminCompanyMarketingNewsPage;
