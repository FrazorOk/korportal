import BirthdaySection from './BirthdaySection/BirthdaySection';
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
				</div>
			</div>
		</div>
	);
};

export default HomePage;
