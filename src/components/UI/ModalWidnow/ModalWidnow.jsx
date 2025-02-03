import { useOutsideClick } from '../../../hooks/useOutsideClick';
import s from './ModalWidnow.module.css';

const ModalWidnow = ({ children, closeModal, background = true }) => {
	return (
		<div className={s.modal}>
			<div ref={useOutsideClick(() => closeModal())} className={`${s.modal_container} ${background && s.background}`}>
				{children}
			</div>
			<button onClick={() => closeModal()} className={s.modal_close}></button>
		</div>
	);
};

export default ModalWidnow;
