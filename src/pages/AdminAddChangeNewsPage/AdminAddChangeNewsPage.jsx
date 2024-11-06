import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AdminPostSection from './AdminPostSection/AdminPostSection';

const AdminAddChangeNewsPage = () => {
	let { newsId } = useParams();

	useEffect(() => {
		console.log(newsId);
	}, [newsId]);

	return (
		<div>
			{newsId ? <h1>Редагування події</h1> : <h1>Створення нової події</h1>}
			<div className="row">
				<div className="column-50">
					<AdminPostSection />
				</div>
			</div>
		</div>
	);
};

export default AdminAddChangeNewsPage;
