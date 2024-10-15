import { useState } from 'react';
import s from './NewsItem.module.css';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';

const NewsItem = ({ item }) => {
	let { title, pub_date, tags, text, img } = item;
	let [visibleStatus, toggleVisibleStatus] = useState(false);

	return (
		<div className={`${s.item} ${visibleStatus && s.active}`}>
			<div className={s.left_column}>
				<p className={s.title}>{title}</p>
				<p className={s.date}>{pub_date}</p>
				<div className={s.tags}>
					{tags.map((item, index) => (
						<div key={index} style={item === 'День стажу' && { backgroundColor: '#5182FE' }} className={s.tag}>
							<p>{item}</p>
						</div>
					))}
				</div>
				<p className={`${s.text}`}>{text}</p>
			</div>
			<div className={s.right_column}>
				<div className={s.images_container}>
					<img src={img} alt="" />
				</div>
			</div>
			<button className={s.open_button} onClick={(e) => toggleVisibleStatus((status) => (visibleStatus = !status))}>
				<img src={arrowIcon} alt="" />
			</button>
		</div>
	);
};

export default NewsItem;
