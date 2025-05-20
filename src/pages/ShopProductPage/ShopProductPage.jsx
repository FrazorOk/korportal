import { ShopProductCard } from '../../components/ShopProductCard/ShopProductCard';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';

const ShopProductPage = () => {
	return (
		<div>
			<h1>Товари СОФТКОМ</h1>
			<GoBackButton toLink={'/shop'} />
			<ShopProductCard />
		</div>
	);
};

export default ShopProductPage;
