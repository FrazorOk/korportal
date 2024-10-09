import s from './ImagesPage.module.css';
import NewSection from './NewSection/NewSection';

const ImagesPage = () => {
	return (
		<div>
			<h1>Фотогалерея</h1>

			<div className="row">
				<NewSection />
			</div>
		</div>
	);
};

export default ImagesPage;
