import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = ({ status, toggleMobileMode, data, titleName }) => {
	return (
		<nav>
			<p className={s.label_menu}>{titleName}</p>
			<ul className={`${s.navigation} ${status ? s.active : ''}`}>
				{data.map((link, index) => {
					return (
						<li key={`navigation${index}`}>
							<NavLink
								onClick={(e) => toggleMobileMode((button) => !button)}
								className={({ isActive }) => (isActive ? s.active : '')}
								to={`${link.path}`}>
								<img src={link.icon} alt="icon" />
								<p>{link.name}</p>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
