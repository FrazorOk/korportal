import s from './AdminPostSection.module.css';
import smileIcon from '../../../assets/img/icons/smile-icon.svg';
import deleteIcon from '../../../assets/img/icons/delete-icon.svg';
import EmojiList from '../../../components/EmojiList/EmojiList';
import { createNewPost } from '../../../api/api.js';
import { useEffect, useState, useRef } from 'react';

const AdminPostSection = ({ newsId, data }) => {
	let [visibleStatus, setVisibleStatus] = useState(false);
	let [visibleStatus2, setVisibleStatus2] = useState(false);
	let [title, setTitle] = useState('');
	let [date, setDate] = useState('дд.мм.рррр 00:00:00');
	let [text, setText] = useState('');
	let [tags, setTags] = useState('');
	let [images, setImages] = useState('');
	let [comment, setComment] = useState([]);
	let ref = useRef();

	const selectHandler = (e) => {
		e.preventDefault();

		// let data = {
		// 	title: title,
		// 	date: date,
		// 	tags: tags,
		// 	text: text,
		// 	imgUrl: '',
		// 	imgFile: '',
		// 	comments: [
		// 		{
		// 			autor: '',
		// 			comment_txt: '',
		// 			post_date: '',
		// 		},
		// 	],
		// };

		let data = {
			title: title,
			tags: tags.split(', '),
			date: date,
			text: text,
			imgFile: ref.current.files[0],
			cat_id: 1,
		};

		createNewPost(data);
	};

	useEffect(() => {
		setTitle(data.title);
		setDate(data.pub_date);
		data.tags && data.tags.length > 0 && setTags(data.tags.join(', '));
		setText(data.text);
		setImages(data.img);
		setComment(data.comment);
	}, [data]);
	useEffect(() => {
		console.log(comment);
	}, [comment]);

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
						<input type="datetime-local" step="1" onChange={(e) => setDate(e.target.value)} value={date} />
					</p>
				</div>

				<div className={s.post_item}>
					<p>Теги:</p>
					<input placeholder="Теги, теги, ..." type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
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

					{images && (
						<div className={s.image_container}>
							<img className={s.image_url} src={images} alt="" />
							<button
								onClick={(e) => {
									e.preventDefault();
									setImages('');
								}}
								title="Видалити зображення">
								<img src={deleteIcon} alt="" />
							</button>
						</div>
					)}

					<input ref={ref} className={s.image} type="file" name="myImage" />
				</div>

				{comment && comment.length > 0 ? (
					<div className={s.post_item}>
						<p>Коментарі:</p>
						<div className={s.comments_list}>
							{comment.map((item) => (
								<div className={s.comment}>
									<div className={s.comment_column}>
										<p style={{ color: '#004795' }}>{item.autor}</p>
										<p style={{ color: '#7d7d7d', fontSize: '12px' }}>{item.post_date}</p>
										<p>{item.comment_txt}</p>
									</div>
									<button
										onClick={(e) => {
											e.preventDefault();

											setComment((el) => {
												let currentArray = [];
												el.forEach((element) => {
													if (element != item) {
														currentArray.push(element);
													}
												});
												console.log(currentArray);

												return currentArray;
											});
										}}
										title="Видалити коментар">
										<img src={deleteIcon} alt="" />
									</button>
								</div>
							))}
						</div>
					</div>
				) : (
					''
				)}

				<div className={s.select_buttons}>
					<button className={s.cancel}>Відмінити</button>
					<button className={s.select} onClick={selectHandler}>
						Опублікувати
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminPostSection;
