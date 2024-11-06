import s from './AddNewPostSection.module.css';
import addIcon from '../../../assets/img/icons/add-icon.svg';
import { Link } from 'react-router-dom';

const AddNewPostSection = () => {
	return (
		<div className={s.add_post}>
			<Link to={'./add-change-news'} className={s.row}>
				<img src={addIcon} alt="" />
				<p>Додати подію</p>
			</Link>
		</div>
	);
};

export default AddNewPostSection;
