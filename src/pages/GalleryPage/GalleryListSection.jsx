import { useEffect, useState } from 'react';
import GalleryList from '../../components/GalleryList/GalleryList';
import { getGalleryCatalogs } from '../../api/api';
import Loader from '../../components/UI/Loader/Loader';
import FilesFilter from '../../components/FilesFilter/FilesFilter';

const GalleryListSection = () => {
	let [data, setData] = useState([]);
	let [isFilteredData, setFilteredData] = useState([]);
	let [isFetched, setFetched] = useState(false);
	let [isFilterParametr, setFilterParametr] = useState(null);
	let [isFilterBtns, setFilterBtns] = useState([{ title: 'Усі', filterParametr: null }]);

	const findYearsFilters = (catalogs) => {
		let unicValues = [];

		catalogs.forEach((element) => {
			if (element) {
				let currentYear = element.create_date.slice(0, 4);
				!unicValues.find((el) => el === currentYear) && unicValues.push(currentYear);
			}
		});

		let currentYearsParametrs = unicValues.map((item) => ({ title: item, filterParametr: item }));

		setFilterBtns((btnsFilter) => [...btnsFilter, ...currentYearsParametrs]);
	};

	useEffect(() => {
		setFetched(true);
		getGalleryCatalogs().then((response) => {
			console.log(response);
			setData(response);
			findYearsFilters(response);
			setFetched(false);
		});
	}, []);

	useEffect(() => {
		if (!isFilterParametr) {
			setFilteredData(data);
		} else {
			const filteredArray = data.filter((catalog) => catalog && catalog.create_date.slice(0, 4) === isFilterParametr);
			setFilteredData(filteredArray);
		}
	}, [isFilterParametr, data]);

	return (
		<>
			<FilesFilter changeFilter={setFilterParametr} btns={isFilterBtns} />
			<div className="row">
				{isFetched ? (
					<div style={{ width: '100%', height: '100px', position: 'relative', marginTop: '30px' }}>
						<Loader background={true} />
					</div>
				) : (
					<GalleryList galleryList={isFilteredData} />
				)}
			</div>
		</>
	);
};

export default GalleryListSection;
