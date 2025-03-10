import { useState } from 'react';
import s from './FilesFilter.module.css';

let btns = [
	{ title: 'Усі', filterParametr: null },
	{ title: 'Зображення', filterParametr: 'image' },
	{ title: 'Відео', filterParametr: 'video' },
];

const FilesFilter = ({ changeFilter }) => {
	let [isActiveBtn, setActiveBtn] = useState(0);

	return (
		<div className="row">
			<div className={s.btns}>
				{btns.map((btn, indexBtn) => (
					<button
						className={`base_btn white ${isActiveBtn === indexBtn && 'active'}`}
						onClick={() => {
							setActiveBtn(indexBtn);
							changeFilter(btn.filterParametr);
						}}>
						{btn.title}
					</button>
				))}
			</div>
		</div>
	);
};

export default FilesFilter;
