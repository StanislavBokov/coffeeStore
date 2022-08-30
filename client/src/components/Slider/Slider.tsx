import React, { FC, useRef, useState } from 'react';
import { Button } from '..';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Navigation, Swiper as SwiperType } from "swiper";
import { Link } from 'react-router-dom';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/swiper.scss';
import cn from 'clsx';
import styles from './styles.module.scss';
import { chevron } from '../../assets/icons/index';

interface SliderProps {
  images: string[],
  id: string,
  className?: string,
  AboutCoffeeItemPage?: boolean,
}
export const Slider:FC<SliderProps> = ({ images, id, className, AboutCoffeeItemPage }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  
  return (
    <>
      <Swiper 
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        modules={[Navigation]} 
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current
        }}
        className={styles.swiperWrapper}
      >
        {/* {console.log(prevEl)} */}
        {images.map((img, index) => (
          <SwiperSlide  className={styles.SwiperSlide} key={index}>
            <Link to={`/${id}`}>
              <img src={img} alt="" className={cn(styles.imgCoffee, className)} />
            </Link>
          </SwiperSlide> 
        ))}
        <Button variant="text" onClick={() => swiperInstance!.slidePrev()} size="noSize">
          <img src={chevron} className={cn(styles.chevrvons, styles.chevronLeft, { [styles.chevronLeftAboutPage]: AboutCoffeeItemPage })}/>
        </Button>
        <Button variant="text" onClick={() => swiperInstance!.slideNext()} size="noSize">
          <img src={chevron} className={cn(styles.chevrvons, styles.chevronRight, { [styles.chevronRightAboutPage]: AboutCoffeeItemPage })}/>
        </Button> 
      </Swiper>

    </>
  );
};
