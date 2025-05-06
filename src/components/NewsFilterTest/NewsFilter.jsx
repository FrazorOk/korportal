import { useEffect, useState } from 'react';
import s from './NewsFilter.module.css';
import { useSearchParams } from 'react-router-dom';
import { getNewsList } from '../../api/apiNews';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors/userSelectors';

const btsArray = [
	{
		textBtn: 'Усі',
		title: 'Усі події',
	},
	{
		textBtn: 'Популярне',
		title: 'Сортувати за популярністю',
	},
	{
		textBtn: `Сьогодні`,
		title: 'Фільтрувати за сьогодні',
	},
	{
		textBtn: 'Не переглянуті',
		title: 'Фільтрувати за переглядом',
	},
];

const tags = ["Кар'єрний шлях", 'Життєві віхи', 'Яскраві миті', 'Святковий календар', 'Досягнення', 'Розвиток'];

const NewsFilter = ({ setFilterParams, fullScreen, isFetching }) => {
	let user = useSelector(userSelector.userData);
	let userSeenNews = useSelector(userSelector.userSeenNews);

	const [searchParams, setSearchParams] = useSearchParams();

	let [activeButton, setActiveButton] = useState(0);
	let [isTodayCount, setTodayCount] = useState(0);
	let [isUnVisibleCount, setUnVisibleCount] = useState(0);

	let getDataParams = (filterType) => {
		return {
			userID: user.id,
			fromNumber: 0,
			limitNumber: 100,
			filterType: filterType,
			qt: true,
			all: 0,
			categoryID: 1,
		};
	};

	useEffect(() => {
		if (user && user.id) {
			getNewsList(getDataParams('Сьогодні')).then((result) => {
				setTodayCount(result.qt);
			});
		}
	}, [user]);

	useEffect(() => {
		if (user && user.id) {
			getNewsList(getDataParams('Не переглянуті')).then((result) => {
				setUnVisibleCount(result.qt);
			});
		}
	}, [user, userSeenNews]);

	useEffect(() => {
		let filterParam = searchParams.get('filter');
		if (filterParam === 'noviews') {
			setActiveButton(3);
		}
	}, [searchParams]);

	return (
		<div className={`${s.filters} ${fullScreen && s.full_screen}`}>
			<div className={`${s.filters_row} ${s.params}`}>
				{btsArray.map((item, index) => (
					<button
						title={item.title}
						key={`params buttons ${index}`}
						disabled={isFetching}
						onClick={(e) => {
							async function onClickHandler(e) {
								await setFilterParams({ params: e.target.textContent.split('(')[0].trim(), tags: false });
								setActiveButton(index);
							}
							onClickHandler(e);
						}}
						className={`${activeButton === index ? s.active : ''} ${index === 3 && isUnVisibleCount > 0 && s.nonSeen}`}>
						{item.textBtn}
						{item.textBtn === 'Сьогодні' && ` (${isTodayCount ? isTodayCount : 0})`}
						{item.textBtn === 'Не переглянуті' && ` (${isUnVisibleCount ? isUnVisibleCount : 0})`}
					</button>
				))}
			</div>

			<div className={`${s.filters_row} ${s.tags}`}>
				{tags.map((el, index) => {
					return (
						<button
							title="Фільтрувати за тегом"
							disabled={isFetching}
							key={`tags buttons ${index}`}
							className={activeButton === index + 4 ? s.active : ''}
							onClick={(e) => {
								async function onClickHandler(e) {
									await setFilterParams({ params: e.target.textContent, tags: true });
									setActiveButton(index + 4);
								}
								onClickHandler(e);
							}}>
							{el}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default NewsFilter;
