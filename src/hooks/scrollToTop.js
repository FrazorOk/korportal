import { useEffect } from 'react';

export let useScrollToTop = () => {
	useEffect(() => {
		console.log('scroll top');
		let srcolledBlock = document.querySelector('.main-scroll-block');

		srcolledBlock.scrollTo(0, 0);
	}, []);
};
