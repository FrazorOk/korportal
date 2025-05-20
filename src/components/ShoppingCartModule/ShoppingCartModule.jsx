import s from './ShoppingCartModule.module.css';
import shopingCart from '../../assets/img/icons/shopping-cart.svg';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useEffect, useState } from 'react';
import SoftCoinModule from '../SoftCoinModule/SoftCoinModule';

const ShoppingCartModule = ({ mobileMode, toggleMobileMode }) => {
	let [isOpenedStatus, setOpenedStatus] = useState(false);

	useEffect(() => {
		mobileMode && setOpenedStatus(false);
	}, [mobileMode]);

	const linkOnClickHandler = () => {
		mobileMode && toggleMobileMode((button) => !button);
		setOpenedStatus((status) => !status);
	};

	return (
		<div
			className={`${s.shopping_container} ${isOpenedStatus && s.active}`}
			ref={useOutsideClick(() => isOpenedStatus && setOpenedStatus(false))}>
			<button onClick={linkOnClickHandler} title="Кошик" className={`${s.shopping_btn} `}>
				<img src={shopingCart} alt="shoping сart" />
			</button>

			<div className={s.shopping_body}>
				<div className={s.shopping_top}>
					<p className={s.body_title}>Кошик (0)</p>
					<SoftCoinModule mobile={true} />
				</div>
				<div className={s.body_list}>
					<p style={{ color: '#7d7d7d' }}>Кошик порожній</p>
				</div>
				<div className={s.body_bottom}>
					<button className="standart-btn">Підтвердити</button>
					<p>
						Усього: <b>0 SC</b>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCartModule;
