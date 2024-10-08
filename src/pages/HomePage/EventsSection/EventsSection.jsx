import s from './EventsSection.module.css';
import imgEvent from '../../../assets/img/img-event.jpg';
import calendarIcon from '../../../assets/img/icons/calendarGreen-icon.svg';

const EventsSection = () => {
	return (
		<div className={`${s.events} section-container`}>
			<h3>Події</h3>

			<div className={s.events_list}>
				<div className={s.events_item}>
					<div>
						<img src={imgEvent} alt="" />
					</div>
					<div>
						<p>День програміста</p>
						<div>
							<p>13.09</p>
							<a href="#">
								<img src={calendarIcon} alt="" />
							</a>
						</div>
					</div>
				</div>
				<div className={s.events_item}>
					<div>
						<img src={imgEvent} alt="" />
					</div>
					<div>
						<p>День програміста</p>
						<div>
							<p>13.09</p>
							<a href="#">
								<img src={calendarIcon} alt="" />
							</a>
						</div>
					</div>
				</div>
				<div className={s.events_item}>
					<div>
						<img src={imgEvent} alt="" />
					</div>
					<div>
						<p>День програміста</p>
						<div>
							<p>13.09</p>
							<a href="#">
								<img src={calendarIcon} alt="" />
							</a>
						</div>
					</div>
				</div>
				<div className={s.events_item}>
					<div>
						<img src={imgEvent} alt="" />
					</div>
					<div>
						<p>День програміста</p>
						<div>
							<p>13.09</p>
							<a href="#">
								<img src={calendarIcon} alt="" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventsSection;
