import s from './ShopProduct.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import { Link } from 'react-router-dom';
import EditAdminButton from '../UI/EditAdminButton/EditAdminButton';
import availableIcon from '../../assets/img/icons/fi-rs-check.svg';
import unvailableIcon from '../../assets/img/icons/fi-rs-cross-small.svg';
import { useEffect } from 'react';

const ShopProduct = ({ productData, adminStatus = false }) => {
	let { title, variants, id, img } = productData;

	useEffect(() => {
		console.log(productData);
	}, [productData]);

	return (
		<div className={s.product} key={`${id}product`}>
			<div className={s.product_content}>
				<Link to={`/shop/${id}`} className={s.product_container}>
					{img && img.length > 0 && <img className={s.main_img} src={`${img[0].url}`} />}
					<p className={s.product_title}>{title}</p>
					<span className={s.product_btn} href="">
						Переглянути
						<img src={arrowIcon} alt="" />
					</span>
					{adminStatus && <EditAdminButton link={`add-change-gallery/${id}`} />}
				</Link>
			</div>
			<div className={s.under_product}>
				<p className={`${s.product_available} ${variants.length > 0 && s.available}`}>
					<img className={s.available_img} src={variants.length > 0 ? availableIcon : unvailableIcon} alt="" />
					{variants.length > 0 ? 'В наявності' : 'Немає в наявності'}
				</p>
				<p className={`${s.product_cost} ${variants.length > 0 && s.available}`}>{variants[0].price} SC</p>
			</div>
		</div>
	);
};

export default ShopProduct;
