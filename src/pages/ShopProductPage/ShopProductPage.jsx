import { ShopProductCard } from '../../components/ShopProductCard/ShopProductCard';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton';

const productData = {
	title: 'Футболка поло',
	cost: '500',
	available: true,
	id: 100,
	images: [
		{ type: 'image', url: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp' },
		{ type: 'image', url: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp' },
	],
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptates perferendis molestias vitae distinctio quia repudiandaeimpedit corporis, pariatur id ipsum quod quibusdam, dolorem sint iste eius qui voluptatem magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptates perferendis molestias vitae distinctio quia repudiandaeimpedit corporis, pariatur id ipsum quod quibusdam, dolorem sint iste eius qui voluptatem magnam.',
};

const ShopProductPage = () => {
	return (
		<div>
			<h1>Товари СОФТКОМ</h1>
			<GoBackButton toLink={'/shop'} />
			<ShopProductCard productData={productData} />
		</div>
	);
};

export default ShopProductPage;
