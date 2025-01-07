import { useRef } from 'react';
import VivoChatSection from '../../components/VivoChatSection/VivoChatSection';

const FeedNewsPage = () => {
	let ref = useRef();
	return (
		<div>
			<h1>Стрічка останніх подій</h1>
			<div className="row">
				<VivoChatSection adminStatus={false} ref1={ref} title={false} fullScreen={true} />
			</div>
		</div>
	);
};

export default FeedNewsPage;
