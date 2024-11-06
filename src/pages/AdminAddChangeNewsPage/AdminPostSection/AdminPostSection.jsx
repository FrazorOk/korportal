import s from './AdminPostSection.module.css';
import clockIcon from '../../../assets/img/icons/clock-icon.svg';

const AdminPostSection = () => {
	return (
		<div className={`section-container`}>
			<div className={s.post}>
				<textarea placeholder="Заголовок" className={s.title}></textarea>
				<p className={s.date}>
					<input type="date" />
				</p>
			</div>
		</div>
	);
};

export default AdminPostSection;
