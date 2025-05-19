import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import PageLayout from './components/PageLayout/PageLayout';
import { Outlet } from 'react-router-dom';
import ShopProductPage from './pages/ShopProductPage/ShopProductPage';

export default function App() {
	return (
		<div className="App">
			{/* <div style={{ maxWidth: '1300px', margin: '30px auto' }}>
				<ShopProductPage />
			</div> */}
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
