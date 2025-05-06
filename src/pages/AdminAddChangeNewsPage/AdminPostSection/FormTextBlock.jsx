import s from './AdminPostSection.module.css';
import { useState } from 'react';
import smileIcon from '../../../assets/img/icons/smile-icon.svg';
import EmojiList from '../../../components/EmojiList/EmojiList';

const FormTextBlock = ({ text, setText, validationErrors }) => {
	let [visibleStatus2, setVisibleStatus2] = useState(false);
	let [selectionStart, setSelectionStart] = useState(null);
	let [selectionEnd, setSelectionEnd] = useState(null);

	const boldBtnOnClickHandler = (e) => {
		e.preventDefault();

		let tagStart = '';
		let tagEnd = '';
		let target = e.target.innerHTML;

		console.log(target);

		if (target === 'b') {
			tagStart = '<b>';
			tagEnd = '</b>';
		}
		if (target === 'i') {
			tagStart = '<i>';
			tagEnd = '</i>';
		}
		if (target === 'u') {
			tagStart = '<span style="text-decoration:underline">';
			tagEnd = '</span>';
		}
		if (target === 'link') {
			const result = prompt('Введіть посилання');
			tagStart = `<a href="${result}">`;
			tagEnd = '</a>';
		}

		setText((currentText) => {
			const selectedText = currentText.slice(selectionStart, selectionEnd);
			const newText = currentText.slice(0, selectionStart) + tagStart + selectedText + tagEnd + currentText.slice(selectionEnd);
			return newText;
		});
	};

	return (
		<div className={s.post_item}>
			<p>
				Текст події:
				<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
					*
				</span>
			</p>
			<div className={s.row_btns}>
				<button onClick={boldBtnOnClickHandler}>
					<b>b</b>
				</button>
				<button onClick={boldBtnOnClickHandler}>
					<i>i</i>
				</button>
				<button onClick={boldBtnOnClickHandler}>
					<span style={{ textDecoration: 'underline' }}>u</span>
				</button>
				<button onClick={boldBtnOnClickHandler}>
					<span>link</span>
				</button>
			</div>
			<textarea
				value={text}
				onSelect={(e) => {
					setSelectionStart(e.target.selectionStart);
					setSelectionEnd(e.target.selectionEnd);
				}}
				onChange={(e) => {
					setText(e.target.value);
				}}
				placeholder="Текст події"
				className={`${s.text} ${validationErrors.text ? s.validated : ''}`}></textarea>
			<button
				title="Смайлики"
				onClick={(e) => {
					e.preventDefault();
					setVisibleStatus2((status) => !status);
				}}
				className={s.smile_button}>
				<img src={smileIcon} alt="" />
			</button>
			<EmojiList visibleStatus={visibleStatus2} setSmile={setText} />
		</div>
	);
};

export default FormTextBlock;
