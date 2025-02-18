import { useEffect, useState } from 'react';
import GalleryList from '../../components/GalleryList/GalleryList';
import { getGalleryCatalogs } from '../../api/api';

const GalleryListSection = () => {
	let [data, setData] = useState([]);

	useEffect(() => {
		getGalleryCatalogs().then((response) => setData(response));
	}, []);

	return (
		<div className="row">
			<GalleryList galleryList={data} />
		</div>
	);
};

export default GalleryListSection;
