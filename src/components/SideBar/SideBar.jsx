import s from './SideBar.module.css';
import logo from '../../assets/img/Frame 40.png';
import Navigation from '../Navigation/Navigation';
import { SignOutButton } from '../SingOutButton/SignOutButton';

const SideBar = ({ status, toggleMobileMode }) => {
	return (
		<div className={`${s.side_bar} ${status && s.active}`}>
			<div className={s.side_bar__logo}>
				<a href="#">
					<img src={logo} alt="logo" />
					<p>СОФТКОМ</p>
				</a>
			</div>
			<div className={s.side_bar__menus}>
				<Navigation status={status} toggleMobileMode={toggleMobileMode} />
			</div>
			<div className={s.side_bar__exit}>
				<SignOutButton status={status} />
			</div>
		</div>
	);
};

export default SideBar;
