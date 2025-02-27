import s from './GalleryList.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import clockIcon from '../../assets/img/icons/clock-icon.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../UI/Loader/Loader';
import EditAdminButton from '../UI/EditAdminButton/EditAdminButton';

const GalleryList = ({ galleryList, adminStatus = false }) => {
	let [isGalleryList, setGalleryList] = useState([]);
	let [isCurrentGalleryList, setCurrentGalleryList] = useState([]);
	let [isPaginationIndex, setPaginationIndex] = useState(1);

	const handleScroll = (e) => {
		let block = e.currentTarget;
		// Відступ до кінця блоку
		let y = 0;
		if (Math.ceil(block.scrollTop + block.clientHeight) >= Math.ceil(block.scrollHeight) - y) {
			if (isGalleryList.length >= 20 && isCurrentGalleryList.length < isGalleryList.length) {
				setPaginationIndex((index) => index + 1);
			}
		}
	};

	useEffect(() => {
		let el = document.querySelector('.main-scroll-block');
		el.addEventListener('scroll', (e) => handleScroll(e));
		return () => {
			el.removeEventListener('scroll', (e) => handleScroll(e));
		};
	}, []);
	useEffect(() => {
		if (galleryList && galleryList.length > 0) {
			setGalleryList(galleryList);
		}
	}, [galleryList]);
	useEffect(() => {
		if (isGalleryList && isGalleryList.length > 0) {
			setCurrentGalleryList((array) => [...array, ...isGalleryList.slice(20 * (isPaginationIndex - 1), 20 * isPaginationIndex)]);
		}
	}, [isGalleryList, isPaginationIndex]);

	return (
		<div className={s.list}>
			{isCurrentGalleryList && isCurrentGalleryList.length > 0 ? (
				isCurrentGalleryList.map(
					(galleryItem) =>
						galleryItem && (
							<Link to={`/gallery/${galleryItem.id}`} className={s.item} key={`${galleryItem.id}gallery`}>
								{galleryItem.cover && <img className={s.main_img} src={`${galleryItem.cover}`} />}
								<p className={s.item_title}>
									<span className={s.item_date}>
										<img src={clockIcon} alt="" /> {galleryItem.create_date}
									</span>
									{galleryItem.title}
								</p>
								<span className={s.item_btn} href="">
									Переглянути
									<img src={arrowIcon} alt="" />
								</span>
								{adminStatus && <EditAdminButton link={`add-change-gallery/${galleryItem.id}`} />}
							</Link>
						)
				)
			) : (
				<Loader />
			)}
		</div>
	);
};

export default GalleryList;
