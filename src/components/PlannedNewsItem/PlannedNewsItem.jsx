import s from './PlannedNewsItem.module.css';
import changeIcon from '../../assets/img/icons/pencil-icon.svg';
import deleteIcon from '../../assets/img/icons/delete-icon.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const PlannedNewsItem = ({ data }) => {
	let { id, title, pub_date, autor_name } = data;

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div className={s.planned_item}>
			<div className={s.title}>
				<p>{title && title}</p>
			</div>

			<div className={s.line}></div>

			<div className={s.date_to}>
				<p>
					<span>Заплановано на:</span>
					<br /> {pub_date && pub_date}
				</p>
			</div>

			<div className={s.line}></div>

			<div className={s.autor}>
				<p>
					<span>Автор:</span>
					<br /> {autor_name && autor_name}
				</p>
			</div>

			<div className={s.line}></div>

			<div className={s.buttons}>
				<Link to={`./add-change-news/${id}`} title="Редагувати">
					<img src={changeIcon} alt="" />
				</Link>
				<button title="Видалити">
					<img src={deleteIcon} alt="" />
				</button>
			</div>
		</div>
	);
};

export default PlannedNewsItem;
