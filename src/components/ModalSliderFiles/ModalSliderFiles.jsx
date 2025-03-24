import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ModalWidnow from '../UI/ModalWidnow/ModalWidnow';
import s from './ModalSliderFiles.module.css';

import { useCallback, useRef } from 'react';
import arrowIcon from '../../assets/img/icons/arrow-down-icon.svg';

const ModalSliderFiles = ({ isModalWindowStatus, setModalWindowStatus, data, isActiveSLide }) => {
	const closeModal = () => setModalWindowStatus(false);

	const sliderRef = useRef();
	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slidePrev();
	}, []);
	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		sliderRef.current.swiper.slideNext();
	}, []);

	return (
		<>
			{isModalWindowStatus && (
				<ModalWidnow closeModal={closeModal} background={false} fullScreen={true}>
					<div className={s.slider_in_modal}>
						{typeof data != 'string' && data.length > 1 ? (
							<>
								<Swiper
									ref={sliderRef}
									spaceBetween={50}
									slidesPerView={1}
									keyboard={{
										enabled: true,
									}}
									modules={[Keyboard]}
									initialSlide={isActiveSLide * 1}
									loop={typeof data != 'string' && data.length > 1 ? true : false}
									style={{ height: '100%', minHeight: '100%' }}>
									{data.map((item) => (
										<SwiperSlide style={{ height: '100%', minHeight: '100%' }}>
											<div className={`${s.slider_slide} ${s.modal}`} style={{ height: '100%', minHeight: '100%' }}>
												<div className={s.slider_img_container}>
													{item.file_type === 'image' && <img loading="lazy" className={s.file} src={item.url} alt="" />}
													{item.file_type === 'video' && (
														<video loading="lazy" className={`${s.file} ${s.video}`} controls src={`${item.url}`} alt="" />
													)}
													{item.file_type !== 'video' && item.file_type !== 'image' && (
														<div className={`${s.file} ${s.other_type}`}>
															<span>{item.file_type}</span>
															<span>{item.url}</span>
														</div>
													)}
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
									{data[0].file_type === 'image' && <img className={s.file} src={data[0].url} alt="" />}
									{data[0].file_type === 'video' && <video controls className={`${s.file} ${s.video}`} src={`${data[0].url}`} alt="" />}
									{data[0].file_type !== 'video' && data[0].file_type !== 'image' && (
										<div className={`${s.file} ${s.other_type}`}>
											<span>{data[0].file_type}</span>
											<span>{data[0].url}</span>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</ModalWidnow>
			)}
		</>
	);
};

export default ModalSliderFiles;
