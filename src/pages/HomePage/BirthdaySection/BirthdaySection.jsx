import s from './BirthdaySection.module.css';
import searchIcon from '../../../assets/img/icons/search-icon.svg';
import mailIcon from '../../../assets/img/icons/teams-ms-icon.svg';
import calendarIcon from '../../../assets/img/icons/calendar-icon.svg';
import profileIcon from '../../../assets/img/icons/profile-icon.svg';
import { getAllUsers, getPhotoUser } from '../../../api/graph';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../../authConfig';
import { memo, useEffect, useRef, useState } from 'react';
import { dateConverter } from '../../../helpers/dateConverter';
import Loader from '../../../components/UI/Loader/Loader';
import UserInfoModalBtn from '../../../components/UserInfoModalBtn/UserInfoModalBtn';
import Tabs from '../../../components/UI/Tabs/Tabs';

const dateToYMD = (date, year) => {
	const d = date.getDate();
	const m = date.getMonth(); // без +1, потому что ниже создаем с 0

	return new Date(year, m, d);
};
const dateToYMDArray = (date, year) => {
	if (!date || typeof date !== 'string' || date.length < 5) return new Date('Invalid');

	const [day, month] = date.split('.');

	// Приводим к числам
	const d = parseInt(day, 10);
	const m = parseInt(month, 10) - 1; // Месяцы в JS с 0

	return new Date(year, m, d);
};
const isValidDateString = (str) => {
	return typeof str === 'string' && /^\d{2}\.\d{2}(\.\d{4})?$/.test(str);
};
const tabsTitles = ['Дні народження', 'Дні стажу'];

const BirthdaySection = () => {
	const { instance, accounts } = useMsal();
	let ref = useRef();

	let [users, setUsers] = useState([]);
	let [isSortedUsers, setSortedUsers] = useState([]);
	let [nulledUsers, setNulledUsers] = useState([]);
	let [visibleUsers, setVisibleUsers] = useState([]);
	let [activeButtonFilter, setActiveButtonFilter] = useState(1);
	let [isLoading, setIsLoading] = useState(false);

	// tabs
	let [tabIndex, setIndex] = useState(0);

	// fetches
	function RequestUsersData() {
		instance
			.acquireTokenSilent({
				scopes: ['User.Read.All'],
				account: accounts[0],
			})
			.then((response) => {
				getAllUsers(response.accessToken)
					.then((response) => response.json())
					.then((result) => {
						setUsers(result.value);
					});
			});
	}
	function RequestProfilePhoto(id) {
		return instance
			.acquireTokenSilent({
				...loginRequest,
				account: accounts[0],
			})
			.then((response) => {
				return getPhotoUser(response.accessToken, id)
					.then((response) => {
						if (response) {
							return response.blob();
						} else {
							return '';
						}
					})
					.then((result) => {
						const url = window.URL || window.webkitURL;
						const blobUrl = url.createObjectURL(result);

						if (result.type === 'application/json') {
							return '';
						}

						return blobUrl;
					})
					.catch((error) => console.log(error));
			});
	}

	// Функція формування items у списку
	let sortUsersList = (result) => {
		// Фільтрування активних юзерів

		let filterResult;

		if (tabIndex === 0) {
			filterResult = result.filter(
				(user) =>
					user.accountEnabled &&
					user.onPremisesExtensionAttributes.extensionAttribute2 &&
					user.onPremisesExtensionAttributes.extensionAttribute2 !== 'День народження'
			);
		} else if (tabIndex === 1) {
			filterResult = result.filter(
				(user) =>
					user.accountEnabled &&
					user.onPremisesExtensionAttributes.extensionAttribute1 &&
					user.onPremisesExtensionAttributes.extensionAttribute1 !== 'День народження' &&
					user.onPremisesExtensionAttributes.extensionAttribute1 !== 'Перший день'
			);
		}

		// Константи для дат
		let year = new Date().getFullYear();
		let nulledDay = new Date(`${year}-01-01`);
		let today = new Date(); // сегодня

		// Створення індексу сортування та дат (для додавання у календар)
		let filteredArray = filterResult
			.map((item) => {
				let currentDate =
					tabIndex === 0 ? item.onPremisesExtensionAttributes.extensionAttribute2 : item.onPremisesExtensionAttributes.extensionAttribute1;

				if (!isValidDateString(currentDate)) {
					console.warn('Invalid date string on mobile:', item.displayName, currentDate);
					return null;
				}

				// Форматування для ЮА дати
				let formatedDate = dateConverter(currentDate);

				// днів до сьогодні
				let daysToday = Math.ceil(Math.abs(dateToYMD(today, year).getTime() - nulledDay.getTime()) / (1000 * 3600 * 24));
				let allDaysInYear = Math.ceil(Math.abs(new Date(`${year}-12-31`).getTime() - nulledDay.getTime()) / (1000 * 3600 * 24));
				let daysA = Math.ceil(Math.abs(dateToYMDArray(currentDate, year).getTime() - nulledDay.getTime()) / (1000 * 3600 * 24));

				// date for calendar ms
				const dayMilliseconds = 24 * 60 * 60 * 1000;

				if (daysA - daysToday < 0) {
					// date for calendar ms
					let dateInSeconds = dateToYMDArray(currentDate, year * 1 + 1).setTime(
						dateToYMDArray(currentDate, year * 1 + 1).getTime() - dayMilliseconds
					);

					let dateForCalendarBefor = encodeURI(new Date(dateInSeconds).toISOString()).slice(0, 10);
					let dateForCalendarAfter = encodeURI(dateToYMDArray(currentDate, year * 1 + 1).toISOString()).slice(0, 10);

					return {
						...item,
						index: allDaysInYear + 1 + daysA - daysToday,
						dateForCalendar: { befor: dateForCalendarBefor, after: dateForCalendarAfter },
						uaDate: formatedDate,
					};
				}

				// date for calendar ms
				let dateInSeconds = dateToYMDArray(currentDate, year).setTime(dateToYMDArray(currentDate, year).getTime() - dayMilliseconds);

				let dateForCalendarBefor = encodeURI(new Date(dateInSeconds).toISOString()).slice(0, 10);
				let dateForCalendarAfter = encodeURI(dateToYMDArray(currentDate, year).toISOString()).slice(0, 10);

				return {
					...item,
					index: daysA - daysToday,
					dateForCalendar: { befor: dateForCalendarBefor, after: dateForCalendarAfter },
					uaDate: formatedDate,
				};
			})
			.filter(Boolean);

		filteredArray.sort((a, b) => a.index - b.index);

		setSortedUsers(filteredArray);
	};
	let findVisibleUsers = async (array, status) => {
		setIsLoading(true);

		let data = await Promise.all(
			array.map(async (item, index) => {
				let imgUrl = await RequestProfilePhoto(item.id);
				return { ...item, urlImg: imgUrl };
			})
		);
		if (status === 'first') {
			setNulledUsers(data);
		}
		await setVisibleUsers(data);
		setIsLoading(false);
	};
	let nulledUsersAfterSearch = () => {
		setVisibleUsers(nulledUsers);
		setActiveButtonFilter(1);
	};
	// Handler
	let searchHandler = () => {
		let inputValue = ref.current.value.toUpperCase();

		if (inputValue) {
			setActiveButtonFilter(0);
			let found = isSortedUsers.filter((el) => {
				let elText = el.displayName.toUpperCase();

				if (elText.indexOf(inputValue) > -1) {
					return el;
				}
				return 0;
			});

			if (found.length > 0) {
				findVisibleUsers(found);
			} else {
				setVisibleUsers([]);
			}
		}
	};
	let onclickClosestUsersFilterButton = () => {
		ref.current.value = '';
		findVisibleUsers(nulledUsers);
		setActiveButtonFilter(1);
	};
	let onclickAllUsersFilterButton = () => {
		ref.current.value = '';
		findVisibleUsers(isSortedUsers);
		setActiveButtonFilter(2);
	};

	useEffect(() => {
		RequestUsersData();
	}, []);
	useEffect(() => {
		if (users && users.length > 0) {
			sortUsersList(users);
		}
	}, [users, tabIndex]);
	useEffect(() => {
		if (isSortedUsers) {
			setActiveButtonFilter(1);
			findVisibleUsers(isSortedUsers.slice(0, 4), 'first');
		}
	}, [isSortedUsers]);

	return (
		<div className={`${s.birthday} section-container`}>
			<div className={s.birthday_tabs}>
				<Tabs titleTabs={tabsTitles} setIndex={setIndex} tabIndex={tabIndex} />
			</div>

			<div className={s.birthday_filters}>
				<div className={s.birthday_search}>
					<button title={'Пошук'} disabled={isLoading} onClick={searchHandler}>
						<img src={searchIcon} alt="bell icon" />
					</button>
					<input
						disabled={isLoading}
						onChange={(e) => e.target.value === '' && nulledUsersAfterSearch()}
						onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
						ref={ref}
						type="text"
						placeholder="Пошук тут..."
					/>
				</div>
				<button
					title={'Найближчі'}
					disabled={isLoading}
					onClick={onclickClosestUsersFilterButton}
					className={`${activeButtonFilter === 1 && s.active}`}>
					Найближчі
				</button>
				<button
					title={'Усі'}
					disabled={isLoading}
					onClick={onclickAllUsersFilterButton}
					className={`${activeButtonFilter === 2 && s.active}`}>
					Усі
				</button>
			</div>

			<ul className={s.birthday_list}>
				{isLoading ? (
					<Loader />
				) : visibleUsers.length > 0 ? (
					visibleUsers.map((user, index) => (
						<li key={`birthday user ${index}`} className={`${s.birthday_item} ${user.index === 0 ? s.active : ''}`}>
							<div className={s.birthday_item__user}>
								<UserInfoModalBtn userId={user.id}>
									<img src={user.urlImg ? user.urlImg : profileIcon} alt={profileIcon} />
								</UserInfoModalBtn>

								<div>
									<UserInfoModalBtn userId={user.id}>
										<p style={{ textAlign: 'start' }}>{user.displayName}</p>
									</UserInfoModalBtn>
									<p>{user.jobTitle}</p>
								</div>
							</div>
							<p className={s.birthday_item__date}>{user.uaDate}</p>
							<div className={s.birthday_item__buttons}>
								<a title={'Відкрити Teams'} target="_blank" href={`https://teams.microsoft.com/l/chat/0/0?users=${user.userPrincipalName}`}>
									<img src={mailIcon} alt="" />
								</a>
								<a
									title={'Додати до календаря'}
									target="_blank"
									href={`https://outlook.office.com/calendar/action/compose?allday=true&body=${encodeURI(
										'Посада: ' + user.jobTitle
									)}&enddt=${user.dateForCalendar.after}T24%3A00%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${
										user.dateForCalendar.befor
									}T24%3A00%3A00%2B00%3A00&subject=${tabIndex === 0 ? encodeURI('День народження у ' + user.displayName) : ''}${
										tabIndex === 1 ? encodeURI('День стажу у ' + user.displayName) : ''
									}`}>
									<img src={calendarIcon} alt="" />
								</a>
							</div>
						</li>
					))
				) : (
					<p className={s.birthday_no_item}>Нічого не знайдено</p>
				)}
			</ul>
		</div>
	);
};

export default memo(BirthdaySection);
