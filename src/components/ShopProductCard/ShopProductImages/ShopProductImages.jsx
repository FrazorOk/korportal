import NewsImgSlider from '../../NewsImgSlider/NewsImgSlider';
import s from './ShopProductImages.module.css';

const ShopProductImages = ({ img }) => {
	return (
		<div className={s.images}>
			<NewsImgSlider img={img} shop={true} />
		</div>
	);
};

export default ShopProductImages;
