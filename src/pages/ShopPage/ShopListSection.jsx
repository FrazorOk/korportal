import { useEffect, useState } from 'react';
import ShopList from '../../components/ShopList/ShopList';
import Loader from '../../components/UI/Loader/Loader';
import ShopFilter from '../../components/ShopFilter/ShopFilter';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';
import { getShopList } from '../../api/apiShop';

// const data = [
// 	{
// 		name: 'Футболка поло',
// 		cost: '500',
// 		available: true,
// 		id: 100,
// 		img: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp',
// 	},
// 	{
// 		name: 'Футболка поло',
// 		cost: '500',
// 		available: false,
// 		id: 100,
// 		img: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp',
// 	},
// 	{
// 		name: 'Футболка поло',
// 		cost: '500',
// 		available: true,
// 		id: 100,
// 		img: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp',
// 	},
// 	{
// 		name: 'Футболка поло',
// 		cost: '500',
// 		available: true,
// 		id: 100,
// 		img: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp',
// 	},
// 	{
// 		name: 'Футболка поло',
// 		cost: '500',
// 		available: true,
// 		id: 100,
// 		img: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp',
// 	},
// 	{
// 		name: 'Футболка поло',
// 		cost: '500',
// 		available: true,
// 		id: 100,
// 		img: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp',
// 	},
// 	{
// 		name: 'Футболка поло',
// 		cost: '500',
// 		available: true,
// 		id: 100,
// 		img: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp',
// 	},
// 	{
// 		name: 'Футболка поло',
// 		cost: '500',
// 		available: true,
// 		id: 100,
// 		img: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp',
// 	},
// 	{
// 		name: 'Футболка поло',
// 		cost: '500',
// 		available: true,
// 		id: 100,
// 		img: 'https://portal.softcom.ua/content/pictures/2025/5/12/0_4ce5d999f8f8779e69cde7ebd4d679e3.webp',
// 	},
// ];

const ShopListSection = () => {
	let [isFetched, setFetched] = useState(false);
	let [isProducts, setProducts] = useState([]);
	let user = useSelector(userSelector.userData);

	const fetchingShopList = async () => {
		let result = await getShopList({ userID: user, categoryID: 5 });
		setProducts(result);
	};
	useEffect(() => {
		if (user) fetchingShopList();
	}, [user]);

	return (
		<>
			<ShopFilter />
			<div className="row">
				{isFetched ? (
					<div style={{ width: '100%', height: '100px', position: 'relative', marginTop: '30px' }}>
						<Loader background={true} />
					</div>
				) : (
					<ShopList products={isProducts} />
				)}
			</div>
		</>
	);
};

export default ShopListSection;
