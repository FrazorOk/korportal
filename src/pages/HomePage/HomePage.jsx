import BirthdaySection from './BirthdaySection/BirthdaySection';
import EventSection from './EventSection/EventSection';
import EventsSection from './EventsSection/EventsSection';
import HeroSection from './HeroSection/HeroSection';
import TodaySection from './TodaySection/TodaySection';
import VivoChatSection from './VivoChatSection/VivoChatSection';

const HomePage = () => {
	return (
		<div>
			<h1>Головна</h1>
			<div className="row no-wrap">
				<HeroSection />
				<TodaySection />
			</div>
			<div className="row">
				<EventSection />
			</div>
			<div className="row">
				<VivoChatSection />
				<div className="column-50">
					<BirthdaySection />
					<EventsSection />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
