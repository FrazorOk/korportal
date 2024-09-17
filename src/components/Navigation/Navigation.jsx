import s from './Navigation.module.css';
import { navigationsLinks } from './NavigationLinks';

const Navigation = ({ status }) => {
	return (
		<nav>
			<p className={s.label_menu}>Меню</p>
			<ul className={`${s.navigation} ${status && s.active}`}>
				{navigationsLinks.map((link, index) => {
					return (
						<li key={`navigation${index}`}>
							<a href={`${link.path}`}>
								<img src={link.icon} alt="icon" />
								<p>{link.name}</p>
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
