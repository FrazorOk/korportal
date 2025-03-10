import s from './GoBackButton.module.css';
import arrowIcon from '../../../assets/img/icons/arrow-down-icon.svg';
import { Link } from 'react-router-dom';

const GoBackButton = ({ toLink }) => {
	return (
		<div className="row">
			<Link title="Повернутися" to={toLink} style={{ display: 'flex', gap: '4px', alignItems: 'center', width: 'fit-content' }}>
				<img style={{ transform: 'rotate(90deg)' }} src={arrowIcon} alt="" />
				<p style={{ color: '#7d7d7d', fontWeight: '500' }}>До загального списку</p>
			</Link>
		</div>
	);
};

export default GoBackButton;
