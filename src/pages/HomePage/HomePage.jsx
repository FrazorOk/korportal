import BirthdaySection from './BirthdaySection/BirthdaySection';
import EventsSection from './EventsSection/EventsSection';
import HeroSection from './HeroSection/HeroSection';
import VivoChatSection from './VivoChatSection/VivoChatSection';

const HomePage = () => {
	return (
		<div>
			<HeroSection />

			<div className="row">
				<VivoChatSection />

				<div className="column-60">
					<BirthdaySection />
					<EventsSection />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
