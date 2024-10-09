import { Link } from 'react-router-dom';
import s from './NewSection.module.css';
import arrowIcon from '../../../assets/img/icons/arrow-link-icon.svg';
import img1 from '../../../assets/img/gallery/photo_2024-1.jpg';
import img2 from '../../../assets/img/gallery/photo_2024-2.jpg';
import img3 from '../../../assets/img/gallery/photo_2024-3.jpg';
import img4 from '../../../assets/img/gallery/photo_2024-4.jpg';
import img5 from '../../../assets/img/gallery/photo_2024-5.jpg';

const NewSection = () => {
	return (
		<div className={s.new}>
			<div className={s.new_header}>
				<Link to={'./catalog:2014'}>
					<h2>Нове</h2>
				</Link>
				<Link className={s.link_button} to={'./catalog:2014'}>
					<img src={arrowIcon} alt="icon" />
					<p>Перейти</p>
				</Link>
			</div>
			<ul className={s.new_list}>
				<li className={s.new_item}>
					<img className={s.new_item_img} src={img1} alt="" />
				</li>
				<li className={s.new_item}>
					<img className={s.new_item_img} src={img2} alt="" />
				</li>
				<li className={s.new_item}>
					<img className={s.new_item_img} src={img3} alt="" />
				</li>
				<li className={s.new_item}>
					<img className={s.new_item_img} src={img4} alt="" />
				</li>
				<li className={s.new_item}>
					<img className={s.new_item_img} src={img5} alt="" />
				</li>
			</ul>
		</div>
	);
};

export default NewSection;
