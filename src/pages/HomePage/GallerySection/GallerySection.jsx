import s from './GallerySection.module.css';
import bgImage from '../../../assets/img/hero-img3.jpg';
import arrowIcon from '../../../assets/img/icons/arrow-down-icon.svg';
import imgIcon from '../../../assets/img/icons/img-icon.svg';
import { Link } from 'react-router-dom';

const GallerySection = () => {
	return (
		<Link to="/gallery" className={`${s.gallery_section} section-container`}>
			<img className={s.bg_img} src={bgImage} alt="" />

			<h3 style={{ color: 'white', padding: 0 }}>
				<span className={s.item_date}>Фото та відео</span>
				<p>
					<img src={imgIcon} alt="" />
					Галерея
				</p>
			</h3>
			<span className={s.gallery_btn} href="">
				Переглянути
				<img src={arrowIcon} alt="" />
			</span>
		</Link>
	);
};

export default GallerySection;
