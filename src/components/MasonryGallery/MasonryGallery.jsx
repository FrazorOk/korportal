import { useEffect, useRef, useState } from 'react';
import s from './MasonryGallery.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';

const MasonryGallery = () => {
	let [isContainerHeight, setContainerHeight] = useState(0);
	let [loadedImgs, setLoadedImgs] = useState([]);
	let [isLoadImages, setIsLoadImages] = useState(false);
	let ref = useRef();

	useEffect(() => {
		if (loadedImgs.length < date2.length) {
			date2.forEach((item) => {
				setLoadedImgs((imgs) => [...imgs, false]);
			});
		}
	}, []);

	useEffect(() => {
		console.log(loadedImgs);
		if (loadedImgs.length > 0 && !loadedImgs.includes(false)) {
			console.log(loadedImgs);

			setIsLoadImages(true);
		}
	}, [loadedImgs]);

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			let galleryItems = document.querySelectorAll(`.${s.item}`);
			let slicedItems = [];

			let concatHeight1 = 0;
			let concatHeight2 = 0;
			let concatHeight3 = 0;
			let concatHeight4 = 0;

			galleryItems.forEach((item, index) => {
				if (index < galleryItems.length - 3) {
					slicedItems.push(item);
				}
			});

			for (let index = 0; index < slicedItems.length; index += 4) {
				const element = slicedItems[index];
				concatHeight1 += element.offsetHeight * 1;
			}
			for (let index = 1; index < slicedItems.length; index += 4) {
				const element = slicedItems[index];
				concatHeight2 += element.offsetHeight * 1;
			}
			for (let index = 2; index < slicedItems.length; index += 4) {
				const element = slicedItems[index];
				concatHeight3 += element.offsetHeight * 1;
			}
			for (let index = 3; index < slicedItems.length; index += 4) {
				const element = slicedItems[index];
				concatHeight4 += element.offsetHeight * 1;
			}
			concatHeight1 = concatHeight1 + (slicedItems.length / 4) * 15 - 7;
			concatHeight2 = concatHeight2 + (slicedItems.length / 4) * 15 - 7;
			concatHeight3 = concatHeight3 + (slicedItems.length / 4) * 15 - 7;
			concatHeight4 = concatHeight4 + (slicedItems.length / 4) * 15 - 7;

			setContainerHeight(Math.max(concatHeight1, concatHeight2, concatHeight3, concatHeight4));

			console.log(entries);
			console.log(entries[0].contentRect);
		});

		if (isLoadImages) {
			observer.observe(ref.current);
		}
		return () => {
			ref.current && observer.unobserve(ref.current);
		};
	}, [isLoadImages]);

	return (
		<div ref={ref} className={s.list} style={{ height: isContainerHeight }}>
			{loadedImgs.length === date2.length &&
				date2.map((galleryItem, galleryIndex) => (
					<div className={s.item}>
						<img
							src={`${galleryItem}`}
							onLoad={() => {
								setLoadedImgs((imgs) => {
									console.log(imgs);

									let currentImgs = [...imgs];

									currentImgs[galleryIndex] = true;

									return currentImgs;
								});
							}}
						/>
						<p className={s.item_title}>
							<span style={{ display: 'block', color: 'white', fontSize: '14px', marginBottom: '8px' }}>12 лютого 2025</span>
							Назва каталогу така
						</p>
						<a className={s.item_btn} href="">
							Переглянути
							{/* <img src={arrowIcon} alt="" /> */}
						</a>
					</div>
				))}

			<div className={`${s.item} ${s.break}`}></div>
			<div className={`${s.item} ${s.break}`}></div>
			<div className={`${s.item} ${s.break}`}></div>
		</div>
	);
};

export default MasonryGallery;
