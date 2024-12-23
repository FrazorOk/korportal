import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import s from './NewsImgSlider.module.css';

import { Navigation, Pagination } from 'swiper/modules';
import { useRef } from 'react';

const NewsImgSlider = ({ img }) => {
	const navigationNextRef = useRef(null);
	const navigationPrevRef = useRef(null);

	return (
		<div className={s.slider123}>
			<Swiper
				modules={[Navigation, Pagination]}
				navigation={{
					prevEl: navigationPrevRef.current,
					nextEl: navigationNextRef.current,
				}}
				onBeforeInit={(swiper) => {
					swiper.navigation.nextEl = navigationNextRef.current;
					swiper.navigation.prevEl = navigationPrevRef.current;
				}}
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}>
				{typeof img != 'string' ? (
					img.map((item) => (
						<SwiperSlide>
							<div className={s.slider_slide}>
								<div className={s.slider_img_container}>
									<img src={item} alt="" />
								</div>
							</div>
						</SwiperSlide>
					))
				) : (
					<SwiperSlide>
						<div className={s.slider_slide}>
							<div className={s.slider_img_container}>
								<img src={img} alt="" />
							</div>
						</div>
					</SwiperSlide>
				)}
			</Swiper>
			<button className={s.slider_prev_btn} ref={navigationPrevRef}>
				<img src={arrowIcon} alt="" />
			</button>
			<button className={s.slider_next_btn} ref={navigationNextRef}>
				<img src={arrowIcon} alt="" />
			</button>
			<div className="swiper-pagination"></div>
		</div>
	);
};

export default NewsImgSlider;
