import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HomePage from './pages/HomePage/HomePage';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeamPage from './pages/TeamPage/TeamPage';
import { Provider } from 'react-redux';
import store from './store/store';
import AdminNewsPage from './pages/AdminNewsPage/AdminNewsPage';
import AdminAddChangeNewsPage from './pages/AdminAddChangeNewsPage/AdminAddChangeNewsPage';
import AdminHolidayCalendarPage from './pages/AdminHolidayCalendarPage/AdminHolidayCalendarPage';
import AdminAddChangeHolidayCalendarPage from './pages/AdminAddChangeHolidayCalendarPage/AdminAddChangeHolidayCalendarPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import LearnPage from './pages/LearnPage/LearnPage';
import FeedNewsPage from './pages/FeedNewsPage/FeedNewsPage';
import FeedSeparateNewsPage from './pages/FeedSeparateNewsPage/FeedSeparateNewsPage';
import CompanyMarketingNewsPage from './pages/CompanyMarketingNewsPage/CompanyMarketingNewsPage';
import CompanySeparateNewsPage from './pages/CompanySeparateNewsPage/CompanySeparateNewsPage';
import MarketingSeparateNewsPage from './pages/MarketingSeparateNewsPage/MarketingSeparateNewsPage';
import AdminCompanyMarketingNewsPage from './pages/AdminCompanyMarketingNewsPage/AdminCompanyMarketingNewsPage';
import AdminAddChangeCompanyMarketingNewsPage from './pages/AdminAddChangeCompanyMarketingNewsPage/AdminAddChangeCompanyMarketingNewsPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import AdminGalleryPage from './pages/AdminGalleryPage/AdminGalleryPage';
import AdminAddGalleryPage from './pages/AdminAddGalleryPage/AdminAddGalleryPage';
import GallerySeparatePage from './pages/GallerySeparatePage/GallerySeparatePage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <p>Error</p>,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: 'feed-news/',
				element: <FeedNewsPage />,
			},
			{
				path: 'feed-news/feed-separate-news/:newsId',
				element: <FeedSeparateNewsPage />,
			},
			{
				path: 'company-marketing-news/',
				element: <CompanyMarketingNewsPage />,
			},
			{
				path: 'company-marketing-news/company-separate-news/:newsId',
				element: <CompanySeparateNewsPage />,
			},
			{
				path: 'company-marketing-news/marketing-separate-news/:newsId',
				element: <MarketingSeparateNewsPage />,
			},
			{
				path: 'team/',
				element: <TeamPage />,

				children: [
					{ path: '', element: <div>my team</div> },
					{ path: 'company-structure/', element: <div>company-structure</div> },
					{ path: 'my-holidays/', element: <div>holidays</div> },
				],
			},
			{
				path: 'gallery/',
				element: <GalleryPage />,
			},
			{
				path: 'gallery/catalog/:Id',
				element: <GallerySeparatePage />,
			},
			{
				path: 'movies/',
				element: <MoviesPage />,
			},
			{
				path: 'learn/',
				element: <LearnPage />,
			},
			{
				path: 'admin-news-feed/',
				element: <AdminNewsPage />,
			},
			{
				path: 'admin-news-feed/add-change-news',
				element: <AdminAddChangeNewsPage />,
			},
			{
				path: 'admin-news-feed/add-change-news/:newsId',
				element: <AdminAddChangeNewsPage />,
			},
			{
				path: 'admin-holiday-calendar',
				element: <AdminHolidayCalendarPage />,
			},
			{
				path: 'admin-holiday-calendar/add-change-holiday-calendar',
				element: <AdminAddChangeHolidayCalendarPage />,
			},
			{
				path: 'admin-holiday-calendar/add-change-holiday-calendar/:Id',
				element: <AdminAddChangeHolidayCalendarPage />,
			},
			{
				path: 'admin-company-marketing-news/',
				element: <AdminCompanyMarketingNewsPage />,
			},
			{
				path: 'admin-company-marketing-news/add-change-company-marketing-news',
				element: <AdminAddChangeCompanyMarketingNewsPage />,
			},
			{
				path: 'admin-company-marketing-news/add-change-company-marketing-news/:newsId',
				element: <AdminAddChangeCompanyMarketingNewsPage />,
			},
			{
				path: 'admin-gallery/',
				element: <AdminGalleryPage />,
			},
			{
				path: 'admin-gallery/add-gallery',
				element: <AdminAddGalleryPage />,
			},
		],
	},
]);

const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<MsalProvider instance={msalInstance}>
			<RouterProvider router={router} />
		</MsalProvider>
	</Provider>
);
