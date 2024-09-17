import React from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import PageLayout from './components/PageLayout/PageLayout';

export default function App() {
	return (
		<div className="App">
			<AuthenticatedTemplate>
				<PageLayout>
					<HomePage />
				</PageLayout>
			</AuthenticatedTemplate>

			<UnauthenticatedTemplate>
				<LoginPage />
			</UnauthenticatedTemplate>
		</div>
	);
}
