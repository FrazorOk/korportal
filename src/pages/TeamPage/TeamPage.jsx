import { NavLink, Outlet } from 'react-router-dom';
import s from './TeamPage.module.css';
import { useState } from 'react';
import { useScrollToTop } from '../../hooks/scrollToTop';

const TeamPage = () => {
	let [index, setIndex] = useState(0);
	useScrollToTop();

	return (
		<div className={s.team_page}>
			<h1>Команда</h1>

			<div className={s.team_section}>
				<div className={s.team_nav}>
					<NavLink onClick={() => setIndex(0)} className={index === 0 && s.active} to={''}>
						Мій відділ
					</NavLink>
					<NavLink onClick={() => setIndex(1)} className={index === 1 && s.active} to={'my-holidays'}>
						Відпустки
					</NavLink>
					<NavLink onClick={() => setIndex(2)} className={index === 2 && s.active} to={'company-structure'}>
						Структура компанії
					</NavLink>
				</div>
				<div className={s.team_container}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default TeamPage;
