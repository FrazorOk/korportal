import s from './GalleryList.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import clockIcon from '../../assets/img/icons/clock-icon.svg';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const GalleryList = ({ galleryList }) => {
	let ref = useRef();
	let [isGalleryList, setGalleryList] = useState([]);
	let [isCurrentGalleryList, setCurrentGalleryList] = useState([]);
	let [isPaginationIndex, setPaginationIndex] = useState(1);

	const handleScroll = (e) => {
		let block = e.currentTarget;
		// Відступ до кінця блоку
		let y = 0;
		if (Math.ceil(block.scrollTop + block.clientHeight) >= Math.ceil(block.scrollHeight) - y) {
			setPaginationIndex((index) => index + 1);
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
		<div ref={ref} className={s.list}>
			{isCurrentGalleryList &&
				isCurrentGalleryList.length > 0 &&
				isCurrentGalleryList.map(
					(galleryItem) =>
						galleryItem && (
							<Link to={`/gallery/catalog/${galleryItem.id}`} className={s.item} key={`${galleryItem.id}gallery`}>
								{galleryItem.cover && <img className={s.main_img} loading="lazy" src={`${galleryItem.cover}`} />}
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
							</Link>
						)
				)}
		</div>
	);
};

export default GalleryList;
