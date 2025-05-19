import homeIcon from '../../assets/img/icons/home-icon.svg';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import imgIcon from '../../assets/img/icons/gallery-icon.svg';
import teachIcon from '../../assets/img/icons/teach-icon.svg';
import teamIcon from '../../assets/img/icons/team-icon.svg';
import deshListIcon from '../../assets/img/icons/desh-list-icon.svg';
import newsFeedIcon from '../../assets/img/icons/news-feed.svg';
import balloonsIcon from '../../assets/img/icons/balloons-icon.svg';
import feedIcon from '../../assets/img/icons/fi-rs-apps.svg';
import mkfeedIcon from '../../assets/img/icons/m-k-feed-icon.svg';
import mailIcon from '../../assets/img/icons/mail-icon-grey.svg';

export const navigationsLinks = [
	{
		name: 'Головна',
		path: '/',
		icon: homeIcon,
	},
	{
		name: 'Стрічка новин',
		path: 'feed-news',
		icon: feedIcon,
	},
	{
		name: 'Новини маркетингу та компанії',
		path: 'company-marketing-news',
		icon: mkfeedIcon,
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
		name: 'Галерея',
		path: 'gallery',
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
		name: 'Стрічка новин',
		path: 'admin-news-feed',
		icon: newsFeedIcon,
	},
	{
		name: 'Новини маркетингу та компанії',
		path: 'admin-company-marketing-news',
		icon: mkfeedIcon,
	},
	{
		name: 'Галерея',
		path: 'admin-gallery',
		icon: imgIcon,
	},
	{
		name: 'Календар свят',
		path: 'admin-holiday-calendar',
		icon: balloonsIcon,
	},
];

export const navigationsDevLinks = [
	{
		name: 'Магазин',
		path: 'shop',
		icon: balloonsIcon,
	},
	{
		name: 'Розсилка',
		path: 'admin-mailing-list',
		icon: mailIcon,
	},
	{
		name: 'Журнал запитів',
		path: 'logs',
		icon: deshListIcon,
	},
];
