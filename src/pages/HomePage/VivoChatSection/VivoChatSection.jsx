import s from './VivoChatSection.module.css';

const VivoChatSection = () => {
	return (
		<div className={s.chat}>
			<h3>Наші новини</h3>
			<iframe src="https://engage.cloud.microsoft/embed/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxODMzNjExMjY0MDAifQ?header=false&footer=false&theme=light&includeFeedInformation=false"></iframe>
		</div>
	);
};

export default VivoChatSection;