import { useOutsideClick } from '../../../hooks/useOutsideClick';
import s from './ModalWidnow.module.css';
import exitIcon from '../../../assets/img/icons/exit-cross-icon.svg';

const ModalWidnow = ({ children, closeModal, background = true, fullScreen = false, closeBtn = true }) => {
	return (
		<div className={s.modal}>
			<div
				ref={useOutsideClick(() => closeModal())}
				className={`${s.modal_container} ${background && s.background} ${fullScreen && s.fullScreen}`}>
				{children}
			</div>
			<button style={{ display: `${!closeBtn && 'none'}` }} onClick={() => closeModal()} className={s.modal_close}>
				<img src={exitIcon} alt="" />
			</button>
		</div>
	);
};

export default ModalWidnow;
