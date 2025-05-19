import { useRef, useState } from 'react';
import s from './ShopFilter.module.css';
import searchIcon from '../../assets/img/icons/search-icon.svg';

const ShopFilter = ({ isLoading = false }) => {
	let ref = useRef();
	let [isActiveBtn, setActiveBtn] = useState(0);

	return (
		<div className="row">
			<div className={s.filters}>
				<div className={s.filters_search}>
					<button title={'Пошук'} disabled={isLoading} onClick={() => console.log('yes')}>
						<img src={searchIcon} alt="bell icon" />
					</button>
					<input
						disabled={isLoading}
						onKeyDown={(e) => e.key === 'Enter' && console.log('yes')}
						ref={ref}
						type="text"
						placeholder="Пошук тут..."
					/>
				</div>

				<div className={s.filters_btns}>
					<button
						className={`base_btn white ${isActiveBtn === 0 && 'active'}`}
						onClick={() => {
							setActiveBtn(0);
						}}>
						В наявності
					</button>
					<button
						className={`base_btn white ${isActiveBtn === 1 && 'active'}`}
						onClick={() => {
							setActiveBtn(1);
						}}>
						Усі
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShopFilter;
