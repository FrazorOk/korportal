import s from './PlannedNewsItem.module.css';
import changeIcon from '../../assets/img/icons/pencil-icon.svg';
import deleteIcon from '../../assets/img/icons/delete-icon.svg';

const PlannedNewsItem = () => {
	return (
		<div className={s.planned_item}>
			<div className={s.title}>
				<p>Новий рекорд у Напрямку автоматизації бізнесу!🏆</p>
			</div>

			<div className={s.line}></div>

			<div className={s.created_date}>
				<p>
					<span>Створено:</span>
					<br /> 06.11.2024
				</p>
			</div>

			<div className={s.line}></div>

			<div className={s.date_to}>
				<p>
					<span>Заплановано:</span>
					<br /> 06.11.2024
				</p>
			</div>

			<div className={s.line}></div>

			<div className={s.autor}>
				<p>
					<span>Автор:</span>
					<br /> Жуйков Дмитро
				</p>
			</div>

			<div className={s.line}></div>

			<div className={s.buttons}>
				<button title="Редагувати">
					<img src={changeIcon} alt="" />
				</button>
				<button title="Видалити">
					<img src={deleteIcon} alt="" />
				</button>
			</div>
		</div>
	);
};

export default PlannedNewsItem;
