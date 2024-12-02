import { Link } from 'react-router-dom';
import s from './AddEventButton.module.css';

const AddEventButton = ({ path }) => {
	return <Link to={path} className={s.add_button}></Link>;
};

export default AddEventButton;
