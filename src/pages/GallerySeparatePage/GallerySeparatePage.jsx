import React, { useEffect, useState } from 'react';
import { getGalleryCatalogsByID } from '../../api/api';
import { useParams } from 'react-router-dom';

const GallerySeparatePage = () => {
	let { Id } = useParams();

	let [data, setData] = useState([]);

	useEffect(() => {
		Id && getGalleryCatalogsByID(Id).then((response) => setData(response));
	}, [Id]);

	useEffect(() => {
		console.log(Id);
		console.log(data);
	}, [data]);

	return <div>GallerySeparatePage</div>;
};

export default GallerySeparatePage;
