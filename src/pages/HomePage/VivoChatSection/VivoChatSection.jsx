import { useEffect, useState } from 'react';
import s from './VivoChatSection.module.css';

const VivoChatSection = () => {
	let [status, setStatus] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setStatus(true);
		}, 500);
	}, []);

	return (
		<div className={`${s.chat} section-container`}>
			<h3>Стрічка останніх подій</h3>
			{status && (
				<iframe
					title="viva engage"
					src="https://engage.cloud.microsoft/embed/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxODMzNjExMjY0MDAifQ?header=false&footer=false&theme=light&includeFeedInformation=false"></iframe>
			)}
		</div>
	);
};

export default VivoChatSection;
