import React, { useEffect, useState } from 'react';
import { getGalleryCatalogsByID } from '../../api/api';
import { useParams } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/scrollToTop';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';
import FilesList from '../../components/FilesList/FilesList';
import FilesFilter from '../../components/FilesFilter/FilesFilter';
import ModalSliderFiles from '../../components/ModalSliderFiles/ModalSliderFiles';

const GallerySeparatePage = () => {
	useScrollToTop();

	let { Id } = useParams();
	let [data, setData] = useState({});
	let [isFilterParametr, setFilterParametr] = useState(null);
	let [isModalWindowStatus, setModalWindowStatus] = useState(false);
	let [isActiveSLide, setActiveSLide] = useState(0);

	useEffect(() => {
		Id && getGalleryCatalogsByID(Id, isFilterParametr).then((response) => setData(...response));
	}, [Id, isFilterParametr]);

	return (
		<div>
			<h1>{data.title}</h1>
			<GoBackButton toLink="/gallery" />
			<FilesFilter changeFilter={setFilterParametr} />
			<FilesList data={data.files} setModalWindowStatus={setModalWindowStatus} setActiveSLide={setActiveSLide} />
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
