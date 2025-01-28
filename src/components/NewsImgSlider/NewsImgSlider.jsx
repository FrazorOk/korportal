import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import searchIcon from '../../assets/img/icons/search-icon.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import s from './NewsImgSlider.module.css';

import { Navigation, Pagination } from 'swiper/modules';
import { useCallback, useEffect, useRef, useState } from 'react';
import ModalWidnow from '../UI/ModalWidnow/ModalWidnow';

const NewsImgSlider = ({ img, fullScreen }) => {
	const sliderRef = useRef();
	const navigationNextRef = useRef(null);
	const navigationPrevRef = useRef(null);

	let [modalStatus, setModalStatus] = useState(false);
	let [activeSlide, setActiveSlide] = useState(0);
	let [modalSliderHeight, setModalSliderHeight] = useState(null);

	const zoomOnClickHandler = () => {
		setModalStatus(!modalStatus);
	};

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);

	useEffect(() => {
		if (modalStatus) {
			setModalSliderHeight(sliderRef.current.getBoundingClientRect().height);
		}
	}, [modalStatus]);

	return (
		<>
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
					loop={true}
					onSlideChange={(e) => {
						setActiveSlide(e.activeIndex);
					}}>
					{typeof img != 'string' ? (
						img.map((item) => (
							<SwiperSlide>
								<div className={`${s.slider_slide} ${fullScreen && s.full_screen}`}>
									<div className={s.slider_img_container}>
										<button onClick={zoomOnClickHandler}>
											<img src={searchIcon} />
										</button>
										<img src={item} alt="" />
									</div>
								</div>
							</SwiperSlide>
						))
					) : (
						<SwiperSlide>
							<div className={`${s.slider_slide} ${fullScreen && s.full_screen}`}>
								<div className={s.slider_img_container}>
									<button></button>
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

			{modalStatus && (
				<ModalWidnow closeModal={zoomOnClickHandler}>
					<div className={s.slider_in_modal}>
						<Swiper ref={sliderRef} spaceBetween={50} slidesPerView={1} initialSlide={activeSlide * 1} loop={true}>
							{typeof img != 'string'
								? img.map((item) => (
										<SwiperSlide>
											<div
												style={{ height: `${modalStatus && modalSliderHeight ? modalSliderHeight + 'px' : '100%'}` }}
												className={`${s.slider_slide} ${s.modal}`}>
												<div className={s.slider_img_container}>
													<img src={item} alt="" />
												</div>
											</div>
										</SwiperSlide>
								  ))
								: img.map((item) => (
										<SwiperSlide>
											<div className={`${s.slider_slide} ${s.modal}`}>
												<div className={s.slider_img_container}>
													<img src={item} alt="" />
												</div>
											</div>
										</SwiperSlide>
								  ))}
						</Swiper>
						{typeof img != 'string' && img.length > 1 && (
							<>
								<button className={s.slider_modal_prev_btn} onClick={handlePrev}>
									<img src={arrowIcon} alt="" />
								</button>
								<button className={s.slider_modal_next_btn} onClick={handleNext}>
									<img src={arrowIcon} alt="" />
								</button>
							</>
						)}
					</div>
				</ModalWidnow>
			)}
		</>
	);
};

export default NewsImgSlider;
