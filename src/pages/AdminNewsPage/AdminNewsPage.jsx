import { memo, useEffect, useRef, useState } from 'react';
import VivoChatSection from '../../components/VivoChatSectionTest/VivoChatSection';
import PlannedNewsSection from './PlannedNewsSection/PlannedNewsSection';
import AddNewPostSection from './AddNewPostSection/AddNewPostSection';
import { useRedirectAdmin } from '../../hooks/useRedirectHook';
import { useScrollToTop } from '../../hooks/scrollToTop';

const AdminNewsPage = () => {
	let { statusAdmin } = useRedirectAdmin();

	let ref = useRef();
	let ref2 = useRef();
	let ref3 = useRef();

	const [width, setwidth] = useState(0);
	const [scroll, setScroll] = useState(0);
	const [windowHeight, setWindowHeight] = useState(null);
	const [statusStiky, setStatusStiky] = useState(false);
	const [stikuNeeded, setStikuNeeded] = useState(false);

	useScrollToTop();

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

	useEffect(() => {
		if (statusAdmin) {
			const observer = new ResizeObserver((entries) => {
				setwidth(entries[0].contentRect.width / 2 - 15);
				setWindowHeight(window.innerHeight);
			});
			observer.observe(ref.current);
			return () => {
				ref.current && observer.unobserve(ref.current);
			};
		}
	}, [statusAdmin]);

	useEffect(() => {
		if (statusAdmin) {
			if (windowHeight) {
				let el = document.querySelector('.main-scroll-block');
				el.addEventListener('scroll', (e) => handleScroll(window.innerHeight));
				return () => {
					window.removeEventListener('scroll', (e) => handleScroll(window.innerHeight));
				};
			}
		}
	}, [windowHeight, statusAdmin]);

	return (
		<>
			{statusAdmin && (
				<div>
					<h1>Налаштування стрічки останніх новин</h1>

					<div ref={ref} style={{ marginTop: '30px' }} className="row end">
						<div
							ref={ref3}
							style={{ width: width }}
							className={`column-50 ${stikuNeeded && scroll < 0 && 'sticky-position'} ${
								stikuNeeded && statusStiky && 'sticky-position__bottom'
							}`}>
							<AddNewPostSection />
							<PlannedNewsSection />
						</div>
						<VivoChatSection adminStatus={true} ref1={ref2} title={true} fullScreen={false} />
					</div>
				</div>
			)}
		</>
	);
};

export default memo(AdminNewsPage);
