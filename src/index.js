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
import ImagesPage from './pages/ImagesPage/ImagesPage';
import { Provider } from 'react-redux';
import store from './store/store';
import AdminNewsPage from './pages/AdminNewsPage/AdminNewsPage';
import AdminAddChangeNewsPage from './pages/AdminAddChangeNewsPage/AdminAddChangeNewsPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <HomePage />,
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
				path: 'images/',
				element: <ImagesPage />,
			},
			{
				path: 'admin-news-feed/',
				element: <AdminNewsPage />,
			},
			{ path: 'admin-news-feed/add-change-news', element: <AdminAddChangeNewsPage /> },
			{ path: 'admin-news-feed/add-change-news/:newsId', element: <AdminAddChangeNewsPage /> },
		],
	},
	{
		path: '*',
		element: <App />,
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
