import { useEffect, useState } from 'react';
import s from './VivoChatSection.module.css';
import NewsList from '../../../components/NewsList/NewsList';

let data = [
	{
		id: '1',
		title: 'ВІТАЄМО З ДНЕМ СТАЖУ!⭐',
		text: "Сьогодні ми маємо ще один чудовий привід для святкування — 5-го жовтня свою дев‘яту річницю роботи святкувала наша колега Батура Ольга!💐 Це вражаюча подія, і ми вдячні за твою відданість, професіоналізм та невтомну енергію. Твій внесок у команду справді неоціненний, і кожен день ти надихаєш нас досягати нових вершин.📈 Наші найщиріші вітання!🎊🤞🌟\r\n\r\n \r\n\r\nДев’ять років разом — це багато,\r\n\r\nЗ тобою у команді — завжди радість, свято.\r\n\r\nТвоя праця, енергія, дух,\r\n\r\nНас надихаєш, як яскравий звук.\r\n\r\nТи досягнула висот, не зупиняйся,\r\n\r\nНа нові вершини з нами мандруй,\r\n\r\nБажаємо щастя, здоров'я, тепла,\r\n\r\nНехай кожен день приносить добра.\r\n\r\nНехай мрії збудуться, все буде клас,\r\n\r\nЗ тобою в команді — лише зростання в нас!\r\n\r\n \r\n\r\nЩиро вітаємо тебе, Ольго!🌞 Бажаємо тобі нових досягнень, цікавих проектів та безліч позитивних моментів у роботі. Нехай попереду буде ще багато років успішної співпраці!🥳 🏆🙌\r\n\r\n \r\n\r\nЗапрошуємо привітати колегу у коментарях!👇👇👇",
		pub_date: '2024-10-10 14:48:50',
		cat_id: '1',
		img: 'https://portal.softcom.ua/content/pictures/news/1/preview.jpeg',
		tags: ['День стажу'],
		comment: [
			{
				autor: 'Палкін Олександр',
				comment_txt: 'Super',
				post_date: '2024-10-11 10:49:19',
			},
			{
				autor: 'Жуйков Дмитро',
				comment_txt: 'Realy good!',
				post_date: '2024-10-11 11:19:27',
			},
		],
	},
	null,
];

const VivoChatSection = () => {
	let [status, setStatus] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setStatus(true);
		}, 500);
	}, []);

	return (
		<div className={`${s.chat} section-container`}>
			<h3>Стрічка останніх подій</h3>
			<NewsList data={data} />
			{/* {status && (
				<iframe
					title="viva engage"
					src="https://engage.cloud.microsoft/embed/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxODMzNjExMjY0MDAifQ?header=false&footer=false&theme=light&includeFeedInformation=false"></iframe>
			)} */}
		</div>
	);
};

export default VivoChatSection;
