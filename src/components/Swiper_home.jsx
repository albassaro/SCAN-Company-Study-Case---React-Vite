import React from 'react'
import { useMediaQuery} from 'react-responsive'
import { Navigation} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/css/grid"

import global from "../styles/globalStyles.module.scss";
import sw from "../styles/components/slider_homepage.module.scss"


function SliderHomePage() {
  
  const isDesktop = useMediaQuery({
    query: '(min-width: 1000px)'
  })
  const isMobile = useMediaQuery({
    query: '(max-width: 375px)'
  })
  const cardsContext = [
    { 
      image: <img src="./assets/icons/swiper-clock-icon.svg" alt="" />,
      text: <p>Высокая и оперативная скорость обработки заявки</p>
    },
    { 
      image: <img src="./assets/icons/swiper-search-icon.svg" alt="" />,
      text: 
      <p> Огромная комплексная база данных, обеспечивающая 
          объективный ответ на запрос 
      </p>
    },
    { 
      image: <img src="./assets/icons/swiper-shield-icon.svg" alt="" />,
      text: 
        <p> Защита конфеденциальных сведений, не подлежащих разглашению по
            федеральному законодательству
        </p>
    },
    { 
      image: <img src="./assets/icons/swiper-clock-icon.svg" alt="" />,
      text: <p>Высокая и оперативная скорость обработки заявки</p>
    },
    { 
      image: <img src="./assets/icons/swiper-search-icon.svg" alt="" />,
      text: 
      <p> Огромная комплексная база данных, обеспечивающая 
          объективный ответ на запрос 
      </p>
    },
    { 
      image: <img src="./assets/icons/swiper-shield-icon.svg" alt="" />,
      text: 
        <p> Защита конфеденциальных сведений, не подлежащих разглашению по
            федеральному законодательству
        </p>
    },
    
  ]

  return (
    <Swiper
      className={sw.container}
      modules={[Navigation]}
      spaceBetween={0}
      {...isDesktop ? {slidesPerView: 3} : isMobile ? {slidesPerView: 1} : {slidesPerView: 3}}
      navigation = {{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      scrollbar={{ draggable: true }}
      rewind = {true}
    > 
    
    <div className={sw.button_next}></div>
    <span className="swiper-button-next"></span>
    <div className={sw.button_prev}></div>
    <span className="swiper-button-prev"></span>

    { cardsContext.map((card, index)=>
        <SwiperSlide className={sw.swiper_slide} key={index}>
        <div className={sw.swiper_wrapper}>
          <div className={sw.item}>
            <div className={sw.item_logo}>
              {card.image}
            </div>
            <div className={sw.item_text}>
              {card.text}
            </div>
          </div>
        </div>
      </SwiperSlide>    
    )}
    </Swiper>
  );
}

export default SliderHomePage;
