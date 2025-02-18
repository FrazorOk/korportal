import { useState } from 'react';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';
import { useScrollToTop } from '../../hooks/scrollToTop';
import { useRedirectAdmin } from '../../hooks/useRedirectHoook';
import AdminAddGalleryFormSection from './AdminAddGalleryFormSection/AdminAddGalleryFormSection';

const AdminAddGalleryPage = () => {
	let { statusAdmin } = useRedirectAdmin();

	let [data, setData] = useState({});

	useScrollToTop();

	return (
		<>
			{statusAdmin && (
				<div>
					<h1>Створення нового каталогу</h1>
					<GoBackButton toLink={`/admin-gallery`} />
					<div className="row">
						<div className="column-50">
							<AdminAddGalleryFormSection data={data} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AdminAddGalleryPage;
