import s from './ModalWidnow.module.css';

const ModalWidnow = ({ children }) => {
	return (
		<div className={s.modal}>
			<div className={s.modal_container}>{children}</div>
		</div>
	);
};

export default ModalWidnow;
