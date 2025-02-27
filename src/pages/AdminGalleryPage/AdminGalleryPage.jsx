import { useRedirectAdmin } from '../../hooks/useRedirectHoook';
import { useScrollToTop } from '../../hooks/scrollToTop';
import GalleryList from '../../components/GalleryList/GalleryList';
import AddEventButton from '../../components/UI/AddEventButton/AddEventButton';
import { useEffect, useState } from 'react';
import { getGalleryCatalogs } from '../../api/api';

const AdminGalleryPage = () => {
	let { statusAdmin } = useRedirectAdmin();

	let [data, setData] = useState([]);

	useEffect(() => {
		getGalleryCatalogs().then((response) => setData(response));
	}, []);

	useScrollToTop();

	return (
		<>
			{statusAdmin && (
				<div>
					<h1>Налаштування галереї</h1>
					<div className="row" style={{ width: 'calc(25% - 15px)', height: '150px' }}>
						<AddEventButton path={'add-change-gallery'} />
					</div>
					<div className="row">
						<GalleryList galleryList={data} adminStatus={true} />
					</div>
				</div>
			)}
		</>
	);
};

export default AdminGalleryPage;
