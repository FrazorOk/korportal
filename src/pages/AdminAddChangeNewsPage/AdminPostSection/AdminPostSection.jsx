import s from './AdminPostSection.module.css';
import smileIcon from '../../../assets/img/icons/smile-icon.svg';
import deleteIcon from '../../../assets/img/icons/delete-icon.svg';
import EmojiList from '../../../components/EmojiList/EmojiList';
import { useEffect, useState } from 'react';

const AdminPostSection = ({ newsId, data }) => {
	let [visibleStatus, setVisibleStatus] = useState(false);
	let [visibleStatus2, setVisibleStatus2] = useState(false);
	let [title, setTitle] = useState('');
	let [text, setText] = useState('');

	useEffect(() => {
		setTitle(data.title);
		setText(data.text);
	}, [data]);

	return (
		<div className={`section-container`}>
			<form className={s.post}>
				<div className={s.post_item}>
					<p>
						Заголовок:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<textarea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок" className={s.title}></textarea>
					<button
						title="Смайлики"
						onClick={(e) => {
							e.preventDefault();
							setVisibleStatus((status) => !status);
						}}
						className={s.smile_button}>
						<img src={smileIcon} alt="" />
					</button>
					<EmojiList visibleStatus={visibleStatus} setSmile={setTitle} />
				</div>

				<div className={`${s.post_item} ${s.row}`}>
					<p>
						Дата публікації:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<p className={s.date}>
						<input type="date" />
					</p>
					<p>або зараз:</p>
					<p>
						<input className={s.now} type="checkbox" />
					</p>
				</div>

				<div className={s.post_item}>
					<p>Теги:</p>
					<input placeholder="Теги, теги, ..." type="text" />
				</div>

				<div className={s.post_item}>
					<p>
						Текст додії:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Текст події" className={s.text}></textarea>
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
				<div className={s.post_item}>
					<p>
						Зображення:
						<span style={{ fontSize: '20px', color: 'red' }} title="Обов`язкове">
							*
						</span>
					</p>
					<input className={s.image} type="file" name="myImage" />
				</div>

				{newsId ? (
					<div className={s.post_item}>
						<p>Коментарі:</p>
						<div className={s.comments_list}>
							<div className={s.comment}>
								<p>dsf sdf sdf sdf</p>
								<button title="Видалити коментар">
									<img src={deleteIcon} alt="" />
								</button>
							</div>
							<div className={s.comment}>
								<p>dsf sdf sdf sdf</p>
								<button title="Видалити коментар">
									<img src={deleteIcon} alt="" />
								</button>
							</div>
						</div>
					</div>
				) : (
					''
				)}

				<div className={s.select_buttons}>
					<button className={s.cancel}>Відмінити</button>
					<button className={s.select}>Опублікувати</button>
				</div>
			</form>
		</div>
	);
};

export default AdminPostSection;
