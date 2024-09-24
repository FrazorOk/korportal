import React from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import PageLayout from './components/PageLayout/PageLayout';
import { Outlet } from 'react-router-dom';

export default function App() {
	return (
		<div className="App">
			<AuthenticatedTemplate>
				<PageLayout>
					<Outlet />
				</PageLayout>
			</AuthenticatedTemplate>
			<UnauthenticatedTemplate>
				<LoginPage />
			</UnauthenticatedTemplate>
		</div>
	);
}
