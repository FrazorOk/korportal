import { useEffect, useState } from 'react';
import s from './ShopProductCard.module.css';
import ShopProductDescription from './ShopProductDescription/ShopProductDescription';
import ShopProductImages from './ShopProductImages/ShopProductImages';
import ShopProductParams from './ShopProductParams/ShopProductParams';
import { getShopItemById } from '../../api/apiShop';

const nullProductData = {
	title: '',
	cost: '',
	variants: [],
	available: false,
	id: null,
	img: [],
};

export const ShopProductCard = () => {
	let [isProductData, setProductData] = useState(nullProductData);
	let params = {
		title: isProductData.title,
		cost: isProductData.cost,
		available: isProductData.variants.length > 0 ? true : false,
		id: isProductData.id,
	};

	const fetchingShopItem = async () => {
		let result = await getShopItemById({ postID: '335', categoryID: 5 });
		setProductData(result[0]);
	};

	useEffect(() => {
		fetchingShopItem();
	}, []);
	useEffect(() => {
		console.log(isProductData);
		console.log(isProductData.img);
	}, [isProductData]);

	return (
		<div className="row">
			<div className={s.product}>
				<div className={s.product_row}>
					{isProductData.img && isProductData.img.length > 0 && <ShopProductImages img={isProductData.img} />}
					<ShopProductParams params={params} />
				</div>
				<ShopProductDescription description={isProductData.text} />
			</div>
		</div>
	);
};
