import React from 'react';
import { useScrollToTop } from '../../hooks/scrollToTop';
import GalleryListSection from './GalleryListSection';

const GalleryPage = () => {
	useScrollToTop();

	return (
		<div>
			<h1>Галерея</h1>
			<GalleryListSection />
		</div>
	);
};

export default GalleryPage;
