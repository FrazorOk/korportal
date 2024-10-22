import s from './BirthdaySection.module.css';
import searchIcon from '../../../assets/img/icons/search-icon.svg';
import mailIcon from '../../../assets/img/icons/mail-icon.svg';
import calendarIcon from '../../../assets/img/icons/calendar-icon.svg';
import profileIcon from '../../../assets/img/icons/profile-icon.svg';
import { getAllUsers, getPhotoUser } from '../../../api/graph';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../../authConfig';
import { useEffect, useRef, useState } from 'react';
import { dateConverter } from '../../../helpers/dateConverter';
import Loader from '../../../components/Loader/Loader';

const dateToYMD = (date, year) => {
	let d = date.getDate();
	let m = date.getMonth() + 1;
	return new Date('' + year + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d));
};
const dateToYMDArray = (date, year) => {
	let d = date.slice(0, 2);
	let m = date.slice(3, 5);
	return new Date('' + year + '-' + m + '-' + d);
};

const BirthdaySection = () => {
	const { instance, accounts } = useMsal();
	let ref = useRef();

	let [users, setUsers] = useState([]);
	let [nulledUsers, setNulledUsers] = useState([]);
	let [visibleUsers, setVisibleUsers] = useState([]);
	let [activeButtonFilter, setActiveButtonFilter] = useState(1);
	let [isLoading, setIsLoading] = useState(false);

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
						// Фільтрування активних юзерів
						console.log(result);

						let filterResult = result.value.filter(
							(user) =>
								user.accountEnabled &&
								user.onPremisesExtensionAttributes.extensionAttribute2 &&
								user.onPremisesExtensionAttributes.extensionAttribute2 !== 'День народження'
						);

						// Константи для дат
						let year = new Date().getFullYear();
						let nulledDay = new Date(`${year}-01-01`);
						let today = new Date(); // сегодня

						// Створення індексу сортування та дат (для додавання у календар)
						let filteredArray = filterResult.map((item) => {
							// Форматування для ЮА дати
							let formatedDate = dateConverter(item.onPremisesExtensionAttributes.extensionAttribute2);

							// днів до сьогодні
							let daysToday = Math.ceil(Math.abs(dateToYMD(today, year).getTime() - nulledDay.getTime()) / (1000 * 3600 * 24));
							let allDaysInYear = Math.ceil(Math.abs(new Date(`${year}-12-31`).getTime() - nulledDay.getTime()) / (1000 * 3600 * 24));
							let daysA = Math.ceil(
								Math.abs(dateToYMDArray(item.onPremisesExtensionAttributes.extensionAttribute2, year).getTime() - nulledDay.getTime()) /
									(1000 * 3600 * 24)
							);

							// date for calendar ms
							const dayMilliseconds = 24 * 60 * 60 * 1000;

							if (daysA - daysToday < 0) {
								// date for calendar ms
								let dateInSeconds = dateToYMDArray(item.onPremisesExtensionAttributes.extensionAttribute2, year * 1 + 1).setTime(
									dateToYMDArray(item.onPremisesExtensionAttributes.extensionAttribute2, year * 1 + 1).getTime() - dayMilliseconds
								);

								let dateForCalendarBefor = encodeURI(new Date(dateInSeconds).toISOString()).slice(0, 10);
								let dateForCalendarAfter = encodeURI(
									dateToYMDArray(item.onPremisesExtensionAttributes.extensionAttribute2, year * 1 + 1).toISOString()
								).slice(0, 10);

								return {
									...item,
									index: allDaysInYear + 1 + daysA - daysToday,
									dateForCalendar: { befor: dateForCalendarBefor, after: dateForCalendarAfter },
									uaDate: formatedDate,
								};
							}

							// date for calendar ms
							let dateInSeconds = dateToYMDArray(item.onPremisesExtensionAttributes.extensionAttribute2, year).setTime(
								dateToYMDArray(item.onPremisesExtensionAttributes.extensionAttribute2, year).getTime() - dayMilliseconds
							);

							let dateForCalendarBefor = encodeURI(new Date(dateInSeconds).toISOString()).slice(0, 10);
							let dateForCalendarAfter = encodeURI(
								dateToYMDArray(item.onPremisesExtensionAttributes.extensionAttribute2, year).toISOString()
							).slice(0, 10);

							return {
								...item,
								index: daysA - daysToday,
								dateForCalendar: { befor: dateForCalendarBefor, after: dateForCalendarAfter },
								uaDate: formatedDate,
							};
						});

						filteredArray.sort((a, b) => a.index - b.index);

						setUsers(filteredArray);
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
	let findVisibleUsers = async (array, status) => {
		setIsLoading(true);

		let data = await Promise.all(
			array.map(async (item, index) => {
				let imgUrl = await RequestProfilePhoto(item.id);
				if (index === array.length - 1) {
					setIsLoading(false);
				}
				return { ...item, urlImg: imgUrl };
			})
		);
		if (status === 'first') {
			setNulledUsers(data);
		}

		setVisibleUsers(data);
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
			let found = users.filter((el) => {
				let elText = el.displayName.toUpperCase();

				if (elText.slice(0, inputValue.length) === inputValue) {
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
		findVisibleUsers(users);
		setActiveButtonFilter(2);
	};

	useEffect(() => {
		RequestUsersData();
	}, []);

	useEffect(() => {
		if (users) {
			findVisibleUsers(users.slice(0, 4), 'first');
		}
	}, [users]);

	return (
		<div className={`${s.birthday} section-container`}>
			<h3>Майбутні дні народження</h3>
			<div className={s.birthday_filters}>
				<div className={s.birthday_search}>
					<button disabled={isLoading} onClick={searchHandler}>
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
				<button disabled={isLoading} onClick={onclickClosestUsersFilterButton} className={`${activeButtonFilter === 1 && s.active}`}>
					Найближчі
				</button>
				<button disabled={isLoading} onClick={onclickAllUsersFilterButton} className={`${activeButtonFilter === 2 && s.active}`}>
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
								<a title={'Відкрити чат'} target="_blank" href={`https://teams.microsoft.com/l/chat/0/0?users=${user.userPrincipalName}`}>
									<img src={user.urlImg ? user.urlImg : profileIcon} alt={profileIcon} />
								</a>
								<div>
									<a title={'Відкрити чат'} target="_blank" href={`https://teams.microsoft.com/l/chat/0/0?users=${user.userPrincipalName}`}>
										{user.displayName}
									</a>
									<p>{user.jobTitle}</p>
								</div>
							</div>
							<p className={s.birthday_item__date}>{user.uaDate}</p>
							<div className={s.birthday_item__buttons}>
								<a title={'Привітати'} target="_blank" href={`https://teams.microsoft.com/l/chat/0/0?users=${user.userPrincipalName}`}>
									<img src={mailIcon} alt="" />
								</a>
								<a
									title={'Додати до календаря'}
									target="_blank"
									href={`https://outlook.office.com/calendar/action/compose?allday=true&body=${encodeURI(
										'Посада: ' + user.jobTitle
									)}&enddt=${user.dateForCalendar.after}T24%3A00%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${
										user.dateForCalendar.befor
									}T24%3A00%3A00%2B00%3A00&subject=${encodeURI('День народження у ' + user.displayName)}`}>
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

export default BirthdaySection;
