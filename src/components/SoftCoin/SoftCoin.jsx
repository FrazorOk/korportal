import s from './SoftCoin.module.css';
import moneyIcon from '../../assets/img/icons/money-icon.png';

const SoftCoin = ({ number }) => {
	return (
		<p className={s.coin} title="SOFTCoin">
			<img src={moneyIcon} alt="" />
			<span>{number} SC</span>
		</p>
	);
};

export default SoftCoin;
