import { useEffect, useState } from 'react';
import s from './ShopList.module.css';
import ShopProduct from '../ShopProduct/ShopProduct';

const ShopList = ({ products }) => {
	let [isProducts, setProducts] = useState([]);

	useEffect(() => {
		setProducts(products);
	}, [products]);

	return (
		<div className={s.shop_list}>
			{isProducts && isProducts.length > 0 && isProducts.map((product) => <ShopProduct productData={product} key={product.id} />)}
		</div>
	);
};

export default ShopList;
