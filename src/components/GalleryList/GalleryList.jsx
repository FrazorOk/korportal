import s from './GalleryList.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import clockIcon from '../../assets/img/icons/clock-icon.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../UI/Loader/Loader';
import EditAdminButton from '../UI/EditAdminButton/EditAdminButton';
import { reversDateWithoutTime } from '../../helpers/dateConverter';

const GalleryList = ({ galleryList, adminStatus = false }) => {
	let [isGalleryList, setGalleryList] = useState([]);
	let [isCurrentGalleryList, setCurrentGalleryList] = useState([]);
	let [isPaginationIndex, setPaginationIndex] = useState(1);
	let [isEndScroll, setEndScroll] = useState(0);

	const handleScroll = (e) => {
		let block = e.currentTarget;
		// Відступ до кінця блоку
		let y = 0;
		if (Math.ceil(block.scrollTop + block.clientHeight) >= Math.ceil(block.scrollHeight) - y) {
			setEndScroll((endScroll) => endScroll + 1);
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
		if (isEndScroll > 0 && isGalleryList.length >= 20 && isCurrentGalleryList.length < isGalleryList.length) {
			setPaginationIndex((index) => index + 1);
		}
	}, [isEndScroll]);
	useEffect(() => {
		if (isGalleryList && isGalleryList.length > 0) {
			setCurrentGalleryList((array) => [...array, ...isGalleryList.slice(20 * (isPaginationIndex - 1), 20 * isPaginationIndex)]);
		}
	}, [isGalleryList, isPaginationIndex]);

	return (
		<div className={s.list}>
			{isCurrentGalleryList && isCurrentGalleryList.length > 0 ? (
				isCurrentGalleryList.map(
					(galleryItem, galleryIndex) =>
						galleryItem && (
							<>
								{isCurrentGalleryList[galleryIndex - 1] &&
									galleryItem.create_date.slice(0, 4) !== isCurrentGalleryList[galleryIndex - 1].create_date.slice(0, 4) && (
										<h3 className={s.date_title}>{galleryItem.create_date.slice(0, 4)}</h3>
									)}

								{galleryIndex === 0 && <h3 className={s.date_title}>{galleryItem.create_date.slice(0, 4)}</h3>}

								<Link to={`/gallery/${galleryItem.id}`} className={s.item} key={`${galleryItem.id}gallery`}>
									{galleryItem.cover && <img className={s.main_img} src={`${galleryItem.cover}`} />}
									<p className={s.item_title}>
										<span className={s.item_date}>
											<img src={clockIcon} alt="" /> {reversDateWithoutTime(galleryItem.create_date)}
										</span>
										{galleryItem.title}
									</p>
									<span className={s.item_btn} href="">
										Переглянути
										<img src={arrowIcon} alt="" />
									</span>
									{adminStatus && <EditAdminButton link={`add-change-gallery/${galleryItem.id}`} />}
								</Link>
							</>
						)
				)
			) : (
				<Loader />
			)}
		</div>
	);
};

export default GalleryList;
