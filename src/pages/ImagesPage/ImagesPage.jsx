import { useScrollToTop } from '../../hooks/scrollToTop';
import s from './ImagesPage.module.css';
import NewSection from './NewSection/NewSection';

const ImagesPage = () => {
	useScrollToTop();

	return (
		<div style={{ position: 'relative' }}>
			<h1>Фотогалерея</h1>

			<div className="row">
				<NewSection />
			</div>

			<div
				style={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: '0',
					left: '0',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#6e6e6ed2',
					color: 'white',
					borderRadius: '14px',
				}}>
				<h1>В процесі розробки</h1>
			</div>
		</div>
	);
};

export default ImagesPage;
