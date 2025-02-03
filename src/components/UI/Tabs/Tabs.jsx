import s from './Tabs.module.css';

const Tabs = ({ titleTabs, setIndex, tabIndex }) => {
	return (
		<div className={s.tabs}>
			{titleTabs.map((title, index) => {
				return (
					<button
						style={{ width: `${100 / (titleTabs.length * 1)}%` }}
						className={`${index === tabIndex && s.active}`}
						onClick={() => setIndex(index)}>
						{title}
					</button>
				);
			})}
		</div>
	);
};

export default Tabs;
