import s from './ShopProductParams.module.css';
import availableIcon from '../../../assets/img/icons/fi-rs-check.svg';
import unvailableIcon from '../../../assets/img/icons/fi-rs-cross-small.svg';
import moneyIcon from '../../../assets/img/icons/money-icon.png';
import addShopIcon from '../../../assets/img/icons/shopping-cart-add.svg';
import { useState } from 'react';

const paramsRadio1 = ['Білий', 'Чорний', 'Синій'];
const paramsRadio2 = ['Ч', 'Ж'];
const paramsRadio3 = ['S', 'M', 'L', 'XL'];

const ShopProductParams = ({ params }) => {
	let { title, id, available, cost } = params;

	let [isParams, setParams] = useState({ color: '0', sex: '0', size: '0' });

	const changeRadioParam = (e, type) => {
		switch (type) {
			case 'color':
				setParams((state) => {
					return { ...state, color: e.target.value };
				});
				break;
			case 'sex':
				setParams((state) => {
					return { ...state, sex: e.target.value };
				});
				break;
			case 'size':
				setParams((state) => {
					return { ...state, size: e.target.value };
				});
				break;

			default:
				break;
		}
	};

	return (
		<div className={s.params}>
			<div className={s.params_container}>
				<div className={s.params_top}>
					<h2>{title}</h2>
					{available ? (
						<p className={s.available}>
							<img src={availableIcon} alt="" />
							<span>В наявності</span>
						</p>
					) : (
						<p>
							<img src={unvailableIcon} alt="" />
							<span>Немає в наявності</span>
						</p>
					)}
				</div>

				<div className={s.params_main}>
					<p className={s.cost}>
						<img src={moneyIcon} alt="" />
						<span>{cost} SC</span>
					</p>

					<div className={s.params_changes}>
						<div className={s.params_block}>
							<p className={s.params_block_title}>Колір:</p>
							<div className={s.radio_group}>
								{paramsRadio1.map((param, paramIndex) => (
									<label className={`${s.radio} ${isParams.color == paramIndex && s.active}`}>
										<input
											type="radio"
											value={paramIndex}
											checked={isParams.color == paramIndex && true}
											onChange={(e) => changeRadioParam(e, 'color')}
										/>
										{param}
									</label>
								))}
							</div>
						</div>

						<div className={s.params_block}>
							<p className={s.params_block_title}>Стать:</p>
							<div className={s.radio_group}>
								{paramsRadio2.map((param, paramIndex) => (
									<label className={`${s.radio} ${isParams.sex == paramIndex && s.active}`}>
										<input
											type="radio"
											value={paramIndex}
											checked={isParams.sex == paramIndex && true}
											onChange={(e) => changeRadioParam(e, 'sex')}
										/>
										{param}
									</label>
								))}
							</div>
						</div>
						<div className={s.params_block}>
							<p className={s.params_block_title}>Розмір:</p>
							<div className={s.radio_group}>
								{paramsRadio3.map((param, paramIndex) => (
									<label className={`${s.radio} ${isParams.size == paramIndex && s.active}`}>
										<input
											type="radio"
											value={paramIndex}
											checked={isParams.size == paramIndex && true}
											onChange={(e) => changeRadioParam(e, 'size')}
										/>
										{param}
									</label>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className={s.params_bottom}>
					<button className={`standart-btn ${s.add_button}`}>
						<img src={addShopIcon} alt="" />
						<span>Додати в кошик</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShopProductParams;
