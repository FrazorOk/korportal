import s from './SideBar.module.css';
import logo from '../../assets/img/Frame 40.png';
import Navigation from '../Navigation/Navigation';
import { SignOutButton } from '../SingOutButton/SignOutButton';
import { navigationsAdminLinks, navigationsDevLinks, navigationsLinks } from './NavigationLinks';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import { useRedirectDevs } from '../../hooks/useRedirectHook';

const SideBar = ({ status, toggleMobileMode }) => {
	let adminStatus = useSelector(userSelector.userAdminStatus);
	let { statusDev } = useRedirectDevs(false);

	return (
		<div className={`${s.side_bar} ${status && s.active}`}>
			<div className={s.side_bar__logo}>
				<Link to="/">
					<img src={logo} alt="logo" />
					<p>СОФТКОМ</p>
				</Link>
			</div>
			<div className={s.side_bar__menus}>
				<Navigation data={navigationsLinks} titleName={'Меню'} status={status} toggleMobileMode={toggleMobileMode} />
				{adminStatus === 'isAdmin' && (
					<Navigation data={navigationsAdminLinks} titleName={'Адмін меню'} status={status} toggleMobileMode={toggleMobileMode} />
				)}
				{statusDev && <Navigation data={navigationsDevLinks} titleName={'Дев меню'} status={status} toggleMobileMode={toggleMobileMode} />}
			</div>
			<div className={s.side_bar__exit}>
				<SignOutButton status={status} />
			</div>
		</div>
	);
};

export default SideBar;
