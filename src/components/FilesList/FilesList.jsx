import { useEffect, useState } from 'react';
import s from './FilesList.module.css';
import searchIcon from '../../assets/img/icons/search-icon.svg';
import Loader from '../UI/Loader/Loader';

const FilesList = ({ data, setModalWindowStatus, setActiveSLide, isFetched }) => {
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
		setGalleryList(data);
		setPaginationIndex(1);
	}, [data]);
	useEffect(() => {
		if (
			isGalleryList &&
			isCurrentGalleryList &&
			isEndScroll > 0 &&
			isGalleryList.length >= 20 &&
			isCurrentGalleryList.length < isGalleryList.length
		) {
			setPaginationIndex((index) => index + 1);
		}
	}, [isEndScroll]);
	useEffect(() => {
		if (isPaginationIndex === 1) {
			if (isGalleryList && isGalleryList.length > 0) {
				setCurrentGalleryList([...isGalleryList.slice(0, 20)]);
			} else {
				setCurrentGalleryList([]);
			}
		} else {
			setCurrentGalleryList((array) => [...array, ...isGalleryList.slice(20 * (isPaginationIndex - 1), 20 * isPaginationIndex)]);
		}
	}, [isGalleryList, isPaginationIndex]);

	return (
		<div className="row">
			{isFetched ? (
				<div style={{ width: '100%', height: '100px', position: 'relative', marginTop: '30px' }}>
					<Loader background={true} />
				</div>
			) : (
				<div className={s.files}>
					{isCurrentGalleryList.length > 0 ? (
						isCurrentGalleryList.map(
							(fileItem, fileIndex) =>
								fileItem && (
									<div className={s.files__item}>
										{fileItem.file_type === 'image' && <img loading="lazy" className={s.file} src={fileItem.thumb} alt="" />}
										{fileItem.file_type === 'video' && (
											<video controls loading="lazy" className={`${s.file} ${s.video}`} src={`${fileItem.url}`} alt="" />
										)}
										{fileItem.file_type !== 'video' && fileItem.file_type !== 'image' && (
											<div className={`${s.file} ${s.other_type}`}>
												<span>{fileItem.file_type}</span>
												<span>{fileItem.url}</span>
											</div>
										)}
										<button
											className={s.zoom_btn}
											onClick={() => {
												setActiveSLide(fileIndex);
												setModalWindowStatus(true);
											}}>
											<img src={searchIcon} />
										</button>
									</div>
								)
						)
					) : (
						<p style={{ fontSize: '16px', color: '#7d7d7d' }}>Немає файлів</p>
					)}
				</div>
			)}
		</div>
	);
};

export default FilesList;
