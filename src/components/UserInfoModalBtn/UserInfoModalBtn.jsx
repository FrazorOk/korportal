import { useDispatch } from 'react-redux';
import { setUserInformationModalWindowIdUser, toggleUserInformationModalWindowStatus } from '../../store/interfaceSlice';

const UserInfoModalBtn = ({ children, userId }) => {
	let dispatch = useDispatch();

	const visibleHandler = () => {
		dispatch(toggleUserInformationModalWindowStatus(true));
		dispatch(setUserInformationModalWindowIdUser(userId));
	};

	return (
		<button style={{ backgroundColor: 'transparent' }} title="Детальніше" onClick={visibleHandler}>
			{children}
		</button>
	);
};

export default UserInfoModalBtn;
