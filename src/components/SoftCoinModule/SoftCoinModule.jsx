import SoftCoin from '../SoftCoin/SoftCoin';
import s from './SoftCoinModule.module.css';

const SoftCoinModule = ({ mobile = false, desctop = false }) => {
	return (
		<div className={`${s.softcoint} ${mobile && s.mobile} ${desctop && s.desctop}`}>
			<SoftCoin number={500} />
		</div>
	);
};

export default SoftCoinModule;
