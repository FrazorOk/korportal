import { useRedirectAdmin } from '../../hooks/useRedirectHook';
import { useScrollToTop } from '../../hooks/scrollToTop';
import GalleryList from '../../components/GalleryList/GalleryList';
import AddEventButton from '../../components/UI/AddEventButton/AddEventButton';
import { useEffect, useState } from 'react';
import { getGalleryCatalogs } from '../../api/api';
import s from './AdminGalleryPage.module.css';

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
					<div className={`row ${s.add_button}`}>
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
