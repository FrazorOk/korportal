import { useEffect, useState } from 'react';
import s from './ShopProductCard.module.css';
import ShopProductDescription from './ShopProductDescription/ShopProductDescription';
import ShopProductImages from './ShopProductImages/ShopProductImages';
import ShopProductParams from './ShopProductParams/ShopProductParams';

const nullProductData = {
	title: '',
	cost: '',
	available: false,
	id: null,
	images: [],
	description: '',
};

export const ShopProductCard = ({ productData }) => {
	let [isProductData, setProductData] = useState(nullProductData);
	let params = { title: isProductData.title, cost: isProductData.cost, available: isProductData.available, id: isProductData.id };

	useEffect(() => {
		if (productData) {
			setProductData(productData);
			console.log(productData);
		}
	}, [productData]);

	return (
		<div className="row">
			<div className={s.product}>
				<div className={s.product_row}>
					{isProductData.images && isProductData.images.length > 0 && <ShopProductImages img={isProductData.images} />}
					<ShopProductParams params={params} />
				</div>
				<ShopProductDescription description={isProductData.description} />
			</div>
		</div>
	);
};
