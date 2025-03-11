import { useEffect, useState } from 'react';
import GalleryList from '../../components/GalleryList/GalleryList';
import { getGalleryCatalogs } from '../../api/api';
import Loader from '../../components/UI/Loader/Loader';
import FilesFilter from '../../components/FilesFilter/FilesFilter';

const GalleryListSection = () => {
	let [data, setData] = useState([]);
	let [isFetched, setFetched] = useState(false);
	let [isFilterParametr, setFilterParametr] = useState(null);
	let [isBtnsFilter, setBtnsFilter] = useState([{ title: 'Усі', filterParametr: null }]);

	useEffect(() => {
		setFetched(true);
		getGalleryCatalogs().then((response) => {
			setData(response);
			setFetched(false);
		});
	}, []);

	useEffect(() => {
		console.log(isFilterParametr);
	}, [isFilterParametr]);

	return (
		<>
			<FilesFilter changeFilter={setFilterParametr} btns={isBtnsFilter} />
			<div className="row">{isFetched ? <Loader /> : <GalleryList galleryList={data} />}</div>
		</>
	);
};

export default GalleryListSection;
