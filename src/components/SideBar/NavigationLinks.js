import homeIcon from '../../assets/img/icons/home-icon.svg';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import imgIcon from '../../assets/img/icons/img-icon.svg';
import teachIcon from '../../assets/img/icons/teach-icon.svg';
import teamIcon from '../../assets/img/icons/team-icon.svg';
import videoIcon from '../../assets/img/icons/video-icon.svg';
import newsFeedIcon from '../../assets/img/icons/news-feed.svg';
import balloonsIcon from '../../assets/img/icons/balloons-icon.svg';
import feedIcon from '../../assets/img/icons/fi-rs-apps.svg';

export const navigationsLinks = [
	{
		name: 'Головна',
		path: '/',
		icon: homeIcon,
	},
	{
		name: 'Стрічка подій',
		path: 'feed-news',
		icon: feedIcon,
	},
	// {
	// 	name: 'Команда',
	// 	path: 'team',
	// 	icon: teamIcon,
	// },
	// {
	// 	name: 'Навчальний курс',
	// 	path: 'learn',
	// 	icon: teachIcon,
	// },
	{
		name: 'Зображення',
		path: 'images',
		icon: imgIcon,
	},
	// {
	// 	name: 'Відео',
	// 	path: 'movies',
	// 	icon: videoIcon,
	// },
	// {
	// 	name: 'Ще',
	// 	path: 'more',
	// 	icon: arrowIcon,
	// },
];

export const navigationsAdminLinks = [
	{
		name: 'Стрічка подій',
		path: 'admin-news-feed',
		icon: newsFeedIcon,
	},
	{
		name: 'Календар свят',
		path: 'admin-holiday-calendar',
		icon: balloonsIcon,
	},
];
