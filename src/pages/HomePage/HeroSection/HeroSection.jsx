import s from './HeroSection.module.css';
import heroImg from '../../../assets/img/hero-img.jpg';
import heroImg2 from '../../../assets/img/hero-img2.jpg';
import heroImg3 from '../../../assets/img/hero-img3.jpg';

const HeroSection = () => {
	return (
		<div className={s.hero_section}>
			<h1>Головна</h1>
			<div className={s.hero_section__banner}>
				<div className={s.hero_section__content}>
					<h2>Вітаємо на нашому КОРПОРТАЛІ</h2>
					<p>
						Маєш вільну хвилинку часу за обідом, чашкою кави чи у дорозі та хочеш провести її з користю? Ходімо з нами у стрічку останніх
						новин! Тут ти знайдеш усе – цікавинки про те, що відбувається у СОФТКОМ тут і зараз, гарячі дискусії і відкриті коментарі, де
						кожний має волю у своїх думках та враженнях. 
					</p>
				</div>
				<div className={s.hero_section__img}>
					<div className={s.hero_section__list}>
						<div className={s.hero_section__item}>
							<img src={heroImg} alt="" />
						</div>
						<div className={s.hero_section__item}>
							<img src={heroImg2} alt="" />
						</div>
						<div className={s.hero_section__item}>
							<img src={heroImg3} alt="" />
						</div>
						{/* -- */}
						<div className={s.hero_section__item}>
							<img src={heroImg} alt="" />
						</div>
						<div className={s.hero_section__item}>
							<img src={heroImg2} alt="" />
						</div>
						<div className={s.hero_section__item}>
							<img src={heroImg3} alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
