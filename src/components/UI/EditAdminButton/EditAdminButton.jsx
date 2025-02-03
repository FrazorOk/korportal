import { Link } from 'react-router-dom';
import s from './EditAdminButton.module.css';
import changeIcon from '../../../assets/img/icons/pencil-icon.svg';

const EditAdminButton = ({ link }) => {
	return (
		<div className={s.admin_btns}>
			<Link to={`${link}`} title="Редагувати">
				<img src={changeIcon} alt="" />
			</Link>
		</div>
	);
};

export default EditAdminButton;
