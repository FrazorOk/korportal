import React, { useEffect, useState } from 'react';
import { getGalleryCatalogsByID } from '../../api/api';
import { useParams } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/scrollToTop';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';
import FilesList from '../../components/FilesList/FilesList';
import FilesFilter from '../../components/FilesFilter/FilesFilter';
import ModalSliderFiles from '../../components/ModalSliderFiles/ModalSliderFiles';

let btns = [
	{ title: 'Усі', filterParametr: null },
	{ title: 'Зображення', filterParametr: 'image' },
	{ title: 'Відео', filterParametr: 'video' },
];

const GallerySeparatePage = () => {
	useScrollToTop();

	let { Id } = useParams();
	let [data, setData] = useState({});
	let [isFilterParametr, setFilterParametr] = useState(null);
	let [isModalWindowStatus, setModalWindowStatus] = useState(false);
	let [isActiveSLide, setActiveSLide] = useState(0);
	let [isFetched, setFetched] = useState(false);

	useEffect(() => {
		if (Id) {
			setFetched(true);
			getGalleryCatalogsByID(Id, isFilterParametr).then((response) => {
				setData(...response);
				setFetched(false);
				console.log(response);
			});
		}
	}, [Id, isFilterParametr]);

	return (
		<div>
			<h1>{data.title}</h1>
			<GoBackButton toLink="/gallery" />
			<FilesFilter changeFilter={setFilterParametr} btns={btns} />
			<FilesList data={data.files} setModalWindowStatus={setModalWindowStatus} setActiveSLide={setActiveSLide} isFetched={isFetched} />
			<ModalSliderFiles
				isModalWindowStatus={isModalWindowStatus}
				setModalWindowStatus={setModalWindowStatus}
				data={data.files}
				isActiveSLide={isActiveSLide}
			/>
		</div>
	);
};

export default GallerySeparatePage;
