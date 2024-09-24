import { Link, NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { navigationsLinks } from './NavigationLinks';

const Navigation = ({ status, toggleMobileMode }) => {
	return (
		<nav>
			<p className={s.label_menu}>Меню</p>
			<ul className={`${s.navigation} ${status ? s.active : ''}`}>
				{navigationsLinks.map((link, index) => {
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
