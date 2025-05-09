import { useEffect, useState } from 'react';
import s from './UsersList.module.css';
import { useMsal } from '@azure/msal-react';
import { getAllUsers } from '../../api/graph';

const UsersList = ({ addLinkHandler }) => {
	const { instance, accounts } = useMsal();
	let [isUsers, setUsers] = useState([]);
	let [isCurrentUsers, setCurrentUsers] = useState([]);
	let [isSearch, setSearch] = useState('');

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
						let enabledUsers = result.value.filter((item) => item.accountEnabled === true);
						setUsers(enabledUsers);
					});
			});
	}

	useEffect(() => {
		RequestUsersData();
	}, []);
	useEffect(() => {
		setCurrentUsers(isUsers);
	}, [isUsers]);
	useEffect(() => {
		console.log(isCurrentUsers);
	}, [isCurrentUsers]);

	let searchHandler = () => {
		let inputValue = isSearch.toUpperCase();

		if (inputValue) {
			let found = isUsers.filter((el) => {
				let elText = el.displayName.toUpperCase();

				if (elText.indexOf(inputValue) > -1) {
					return el;
				}
				return 0;
			});

			if (found.length > 0) {
				setCurrentUsers(found);
			} else {
				setCurrentUsers([]);
			}
		} else {
			setCurrentUsers(isUsers);
		}
	};

	return (
		<div className={s.users}>
			<input
				onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
				type="text"
				placeholder="Пошук тут..."
				value={isSearch}
				onChange={(e) => setSearch(e.currentTarget.value)}
			/>
			{isCurrentUsers &&
				isCurrentUsers.map((user) => (
					<button
						onClick={(e) => {
							e.preventDefault();
							addLinkHandler(user.id, user.displayName);
						}}>
						<p style={{ cursor: 'pointer' }}>{user.displayName}</p>
					</button>
				))}
		</div>
	);
};

export default UsersList;
