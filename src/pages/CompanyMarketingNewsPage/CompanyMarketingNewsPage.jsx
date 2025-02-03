import CompanyMarketingList from '../../components/CompanyMarketingList/CompanyMarketingList';
import { useScrollToTop } from '../../hooks/scrollToTop';
import { useEffect, useState } from 'react';
import Tabs from '../../components/UI/Tabs/Tabs';
import { useSearchParams } from 'react-router-dom';
import { getNews } from '../../api/api';

const CompanyMarketingNewsPage = () => {
	useScrollToTop();

	const [searchParams, setSearchParams] = useSearchParams();

	let [marketingData, setMarketingData] = useState([]);
	let [companyData, setCompanyData] = useState([]);
	let [tabIndex, setTabIndex] = useState(0);

	const tabsTitles = ['Новини маркетингу', 'Новини компанії'];
	const tabsItems = [
		<CompanyMarketingList admin={false} newsList={marketingData} linkTo="marketing-separate-news" type="marketing" />,
		<CompanyMarketingList admin={false} newsList={companyData} linkTo="company-separate-news" type="company" />,
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
				<h1>Новини маркетингу та компанії</h1>
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
						<h1>Новини маркетингу</h1>
						<CompanyMarketingList admin={false} newsList={marketingData} linkTo="marketing-separate-news" />
					</div>
					<div className="column-50">
						<h1>Новини компанії</h1>
						<CompanyMarketingList admin={false} newsList={companyData} linkTo="company-separate-news" />
					</div>
				</div>
			</div>
		</>
	);
};

export default CompanyMarketingNewsPage;
