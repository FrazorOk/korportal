import s from './ShopProduct.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import { Link } from 'react-router-dom';
import EditAdminButton from '../UI/EditAdminButton/EditAdminButton';
import availableIcon from '../../assets/img/icons/fi-rs-check.svg';
import unvailableIcon from '../../assets/img/icons/fi-rs-cross-small.svg';

const ShopProduct = ({ productData, adminStatus = false }) => {
	let { name, cost, available, id, img } = productData;

	return (
		<div className={s.product} key={`${id}product`}>
			<div className={s.product_content}>
				<Link to={`/product/${id}`} className={s.product_container}>
					{img && <img className={s.main_img} src={`${img}`} />}
					<p className={s.product_title}>{name}</p>
					<span className={s.product_btn} href="">
						Переглянути
						<img src={arrowIcon} alt="" />
					</span>
					{adminStatus && <EditAdminButton link={`add-change-gallery/${id}`} />}
				</Link>
			</div>
			<div className={s.under_product}>
				<p className={`${s.product_available} ${available && s.available}`}>
					<img className={s.available_img} src={available ? availableIcon : unvailableIcon} alt="" />
					{available ? 'В наявності' : 'Немає в наявності'}
				</p>
				<p className={`${s.product_cost} ${available && s.available}`}>{cost} SC</p>
			</div>
		</div>
	);
};

export default ShopProduct;
