import { useRef } from 'react';
import VivoChatSection from '../../components/VivoChatSectionTest/VivoChatSection';

const FeedNewsPage = () => {
	let ref = useRef();
	return (
		<div>
			<h1>Стрічка останніх новин</h1>
			<div className="row">
				<VivoChatSection adminStatus={false} ref1={ref} title={false} fullScreen={true} />
			</div>
		</div>
	);
};

export default FeedNewsPage;
