import BirthdaySection from './BirthdaySection/BirthdaySection';
import EventSection from './EventSection/EventSection';
import NewsSection from './NewsSection/NewsSection';
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
			<div className="row mobile-revers">
				<VivoChatSection />
				<div className="column-50">
					<NewsSection />
					<BirthdaySection />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
