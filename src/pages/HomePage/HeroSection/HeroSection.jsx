import { memo } from 'react';
import s from './HeroSection.module.css';

const HeroSection = () => {
	return (
		<div className={s.hero_section}>
			<div className={`${s.hero_section__banner} section-container`}>
				<div className={s.hero_section__content}>
					<h2>Вітаємо на нашому КОРПОРТАЛІ</h2>
					<p>
						Маєш вільну хвилинку часу за обідом, чашкою кави чи у дорозі та хочеш провести її з користю? Ходімо з нами у стрічку останніх
						новин! Тут ти знайдеш усе – цікавинки про те, що відбувається у СОФТКОМ тут і зараз, гарячі дискусії і відкриті коментарі, де
						кожний має волю у своїх думках та враженнях. 
					</p>
				</div>
				<div className={s.hero_img}></div>
			</div>
		</div>
	);
};

export default memo(HeroSection);
