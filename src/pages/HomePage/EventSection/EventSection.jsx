import s from './EventSection.module.css';
import calendarIcon from '../../../assets/img/icons/calendar-icon.svg';
import { memo } from 'react';

const EventSection = () => {
	return (
		<div className={s.events}>
			<div className={s.events_item}>
				<p>День Програміста</p>
				<div className={s.events_bottom}>
					<div className={s.events_date_row}>
						<p>
							13<span> жовт.</span>
						</p>
						<a href="#">
							<img src={calendarIcon} alt="" />
						</a>
					</div>

					<a href="#" className={s.events_link}>
						Усі
					</a>
				</div>

				<span className={s.figures}></span>
			</div>
			<div className={s.events_item}>
				<p>День Програміста</p>
				<div className={s.events_bottom}>
					<div className={s.events_date_row}>
						<p>
							13<span> жовт.</span>
						</p>
						<a href="#">
							<img src={calendarIcon} alt="" />
						</a>
					</div>

					<a href="#" className={s.events_link}>
						Усі
					</a>
				</div>

				<span className={s.figures}></span>
			</div>
			<div className={s.events_item}>
				<p>День Програміста</p>
				<div className={s.events_bottom}>
					<div className={s.events_date_row}>
						<p>
							13<span> жовт.</span>
						</p>
						<a href="#">
							<img src={calendarIcon} alt="" />
						</a>
					</div>

					<a href="#" className={s.events_link}>
						Усі
					</a>
				</div>

				<span className={s.figures}></span>
			</div>
			<div className={s.events_item}>
				<p>День Програміста</p>
				<div className={s.events_bottom}>
					<div className={s.events_date_row}>
						<p>
							13<span> жовт.</span>
						</p>
						<a href="#">
							<img src={calendarIcon} alt="" />
						</a>
					</div>

					<a href="#" className={s.events_link}>
						Усі
					</a>
				</div>

				<span className={s.figures}></span>
			</div>
		</div>
	);
};

export default memo(EventSection);
