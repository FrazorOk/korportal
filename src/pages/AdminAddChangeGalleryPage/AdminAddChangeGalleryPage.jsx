import { useEffect, useState } from 'react';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';
import { useScrollToTop } from '../../hooks/scrollToTop';
import { useRedirectAdmin } from '../../hooks/useRedirectHook';
import AdminAddGalleryFormSection from './AdminAddGalleryFormSection/AdminAddGalleryFormSection';
import { useParams } from 'react-router-dom';
import { getGalleryCatalogsByID } from '../../api/api';
import GalleryFilesFormSection from './GalleryFilesFormSection/GalleryFilesFormSection';

const AdminAddChangeGalleryPage = () => {
	let { statusAdmin } = useRedirectAdmin();
	let { Id } = useParams();

	let [data, setData] = useState({});

	let getCatalog = async () => {
		let result = await getGalleryCatalogsByID(Id);
		setData(result[0]);
	};

	useEffect(() => {
		if (Id && statusAdmin) {
			getCatalog();
		}
	}, [Id, statusAdmin]);

	useScrollToTop();

	return (
		<>
			{statusAdmin && (
				<div>
					{Id ? <h1>Редагування каталогу</h1> : <h1>Створення нового каталогу</h1>}
					<GoBackButton toLink={`/admin-gallery`} />
					<div className="row">
						<div className="column-50">
							<AdminAddGalleryFormSection data={data} Id={Id} />
						</div>
					</div>
					{Id && (
						<>
							<div className="row">
								<h3>Файли галереї</h3>
							</div>
							<div className="row">
								<GalleryFilesFormSection files={data.files} Id={Id} getCatalogFunction={getCatalog} />
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default AdminAddChangeGalleryPage;
