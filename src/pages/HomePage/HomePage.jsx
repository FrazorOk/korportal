import BirthdaySection from './BirthdaySection/BirthdaySection';
import EventSection from './EventSection/EventSection';
import NewsSection from './NewsSection/NewsSection';
import HeroSection from './HeroSection/HeroSection';
import TodaySection from './TodaySection/TodaySection';
import VivoChatSection from '../../components/VivoChatSection/VivoChatSection';
import { memo, useEffect, useRef, useState } from 'react';
import { useScrollToTop } from '../../hooks/scrollToTop';

const HomePage = () => {
	let ref = useRef();
	let ref2 = useRef();
	let ref3 = useRef();

	const [width, setwidth] = useState(0);
	const [scroll, setScroll] = useState(0);
	const [windowHeight, setWindowHeight] = useState(null);
	const [statusStiky, setStatusStiky] = useState(false);
	const [stikuNeeded, setStikuNeeded] = useState(false);

	const handleScroll = (sizeWindow) => {
		if (ref3.current) {
			if (ref3.current.getBoundingClientRect().height > ref2.current.getBoundingClientRect().height) {
				setStikuNeeded(false);
			} else {
				setStikuNeeded(true);
				let heightWindows = ref3.current.getBoundingClientRect();

				if (ref3.current && ref.current && sizeWindow < heightWindows.height + 130) {
					setStatusStiky(true);
					setScroll(ref.current.getBoundingClientRect().top + ref3.current.getBoundingClientRect().height - sizeWindow + 30);
				} else {
					setStatusStiky(false);
					setScroll(ref.current.getBoundingClientRect().top - 95);
				}
			}
		}
	};

	useScrollToTop();
	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			setwidth(entries[0].contentRect.width / 2 - 15);
			setWindowHeight(window.innerHeight);
		});
		observer.observe(ref.current);
		return () => {
			ref.current && observer.unobserve(ref.current);
		};
	}, []);

	useEffect(() => {
		if (windowHeight) {
			let el = document.querySelector('.main-scroll-block');
			el.addEventListener('scroll', (e) => handleScroll(window.innerHeight));
			return () => {
				window.removeEventListener('scroll', (e) => handleScroll(window.innerHeight));
			};
		}
	}, [windowHeight]);

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
			<div ref={ref} className="row end">
				<div
					ref={ref3}
					style={{ width: width }}
					className={`column-50 ${stikuNeeded && scroll < 0 && 'sticky-position'} ${
						stikuNeeded && statusStiky && 'sticky-position__bottom'
					}`}>
					<NewsSection />
					<BirthdaySection />
				</div>
				<VivoChatSection adminStatus={false} ref1={ref2} title={true} fullScreen={false} />
			</div>
		</div>
	);
};

export default memo(HomePage);
