import s from './ShopProductDescription.module.css';

const ShopProductDescription = ({ description }) => {
	return (
		<div className={s.description}>
			<h3>Опис</h3>
			<p className={s.description_text} dangerouslySetInnerHTML={{ __html: description && description }}></p>
		</div>
	);
};

export default ShopProductDescription;
