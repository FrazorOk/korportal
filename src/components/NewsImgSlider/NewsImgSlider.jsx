import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';
import searchIcon from '../../assets/img/icons/search-icon.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';

import s from './NewsImgSlider.module.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import ModalWidnow from '../UI/ModalWidnow/ModalWidnow';

const NewsImgSlider = ({ img, fullScreen, visibleStatus, shop = false }) => {
	const sliderRef = useRef();
	const sliderMainRef = useRef();
	const navigationNextRef = useRef(null);
	const navigationPrevRef = useRef(null);

	let [modalStatus, setModalStatus] = useState(false);
	let [activeSlide, setActiveSlide] = useState(0);
	let [modalSliderHeight, setModalSliderHeight] = useState(null);

	const zoomOnClickHandler = () => {
		setModalStatus(!modalStatus);
	};

	const handleMainPrev = useCallback(() => {
		if (!sliderMainRef.current) return;
		sliderMainRef.current.swiper.slidePrev();
	}, [visibleStatus]);
	const handleMainNext = useCallback(() => {
		if (!sliderMainRef.current) return;
		sliderMainRef.current.swiper.slideNext();
	}, [visibleStatus]);

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, [visibleStatus]);
	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, [visibleStatus]);

	useEffect(() => {
		if (modalStatus && typeof img != 'string' && img.length > 1) {
			setTimeout(() => {
				setModalSliderHeight(sliderRef.current.getBoundingClientRect().height);
			}, 50);
		}
	}, [modalStatus]);

	return (
		<>
			<div className={s.slider123}>
				{typeof img != 'string' && img.length > 1 ? (
					<>
						<Swiper
							ref={sliderMainRef}
							initialSlide={0}
							spaceBetween={50}
							slidesPerView={1}
							loop={false}
							onSlideChange={(e) => {
								setActiveSlide(e.activeIndex);
							}}>
							{img.map((item) => (
								<SwiperSlide>
									<div className={`${s.slider_slide} ${fullScreen && s.full_screen} ${shop && s.shop}`}>
										<div className={s.slider_img_container}>
											<button onClick={zoomOnClickHandler}>
												<img src={searchIcon} />
											</button>
											{item.type === 'image' && <img className={s.main_img} src={item.url} alt="" />}
											{item.type === 'video' && <video className={s.main_img} src={item.url} controls></video>}
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
						<button className={`${s.slider_modal_prev_btn} ${activeSlide <= 0 && s.disabled}`} onClick={handleMainPrev}>
							<img src={arrowIcon} alt="" />
						</button>
						<button className={`${s.slider_modal_next_btn} ${activeSlide >= img.length - 1 && s.disabled}`} onClick={handleMainNext}>
							<img src={arrowIcon} alt="" />
						</button>
						<div className="swiper-pagination"></div>
					</>
				) : (
					<div className={`${s.slider_slide} ${fullScreen && s.full_screen} ${shop && s.shop}`}>
						<div className={s.slider_img_container}>
							<button onClick={zoomOnClickHandler}>
								<img src={searchIcon} />
							</button>
							{img[0].type === 'image' && <img className={s.main_img} src={img[0].url} alt="" />}
							{img[0].type === 'video' && <video className={s.main_img} src={img[0].url} controls></video>}
						</div>
					</div>
				)}
			</div>

			{modalStatus && (
				<ModalWidnow closeModal={zoomOnClickHandler} background={false} fullScreen={true}>
					<div className={s.slider_in_modal}>
						{typeof img != 'string' && img.length > 1 ? (
							<>
								<Swiper
									ref={sliderRef}
									spaceBetween={50}
									slidesPerView={1}
									keyboard={{
										enabled: true,
									}}
									modules={[Keyboard]}
									initialSlide={activeSlide * 1}
									loop={typeof img != 'string' && img.length > 1 ? true : false}
									style={{ height: '100%', minHeight: '100%' }}>
									{img.map((item) => (
										<SwiperSlide style={{ height: '100%', minHeight: '100%' }}>
											<div style={{ height: '100%', minHeight: '100%' }} className={`${s.slider_slide} ${s.modal}`}>
												<div className={s.slider_img_container}>
													{item.type === 'image' && <img src={item.url} alt="" />}
													{item.type === 'video' && <video src={item.url} controls></video>}
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
								<button className={s.slider_modal_prev_btn} onClick={handlePrev}>
									<img src={arrowIcon} alt="" />
								</button>
								<button className={s.slider_modal_next_btn} onClick={handleNext}>
									<img src={arrowIcon} alt="" />
								</button>
							</>
						) : (
							<div className={`${s.slider_slide} ${s.modal}`}>
								<div className={s.slider_img_container}>
									{img[0].type === 'image' && <img src={img[0].url} alt="" />}
									{img[0].type === 'video' && <video src={img[0].url} controls></video>}
								</div>
							</div>
						)}
					</div>
				</ModalWidnow>
			)}
		</>
	);
};

export default NewsImgSlider;
