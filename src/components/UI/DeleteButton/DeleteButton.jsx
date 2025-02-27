import deleteIcon from '../../../assets/img/icons/delete-icon.svg';

let style = {
	backgroundColor: '#dadada',
	borderRadius: '50%',
	boxShadow: '0 0 8px #0000001a',
	height: 'fit-content',
	padding: '5px',
	position: 'absolute',
	right: '5px',
	top: '5px',
	transition: 'all .3sease 0s',
	width: 'fit-content',
	zIndex: '2',
};

const DeleteButton = ({ onClickHandler }) => {
	return (
		<button onClick={onClickHandler} title="Видалити" style={style}>
			<img src={deleteIcon} alt="delete" />
		</button>
	);
};

export default DeleteButton;
