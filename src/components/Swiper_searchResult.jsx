import { React } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/css/grid"

import global from "../styles/globalStyles.module.scss";
import sr from "../styles/components/slider_resultpage.module.scss"


// .sort((first,second) => {
//         new Date(first.date).getTime() - new Date(second.date).getTime()
        
//     });
function SliderResultPage(hystogramData) {

    const isDesktop = useMediaQuery({
        query: '(min-width: 1000px)'
      })
    const isMobile = useMediaQuery({
        query: '(max-width: 375px)'
      })

    const docsInfo = hystogramData.props[0].data.sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    });

    const docsRisk = hystogramData.props[1].data;

    // Общий массив с данными гистограммы
    const hystogramDataArray =[];

    for (let i=0; i<docsInfo.length; i++){
        hystogramDataArray.splice(i, 0,
        {
            date : new Date(docsInfo[i].date).toLocaleDateString(),
            total: docsInfo[i].value,
            risks: docsRisk[i].value
        })
    }

    return ( 
        <Swiper
            className={sr.container}
            modules={[Navigation]}
            spaceBetween={0}
            {...isDesktop ? hystogramDataArray.length > 8 ? {slidesPerView: 9} : {slidesPerView: hystogramDataArray.length} : isMobile ? {slidesPerView: 1} : {slidesPerView: 9}}
            scrollbar={{ draggable: true }}
            navigation = {{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
            rewind = {true}
        >
            <div className={sr.button_next}></div>
            <span className="swiper-button-next" ></span>
            <div className={sr.button_prev}></div>
            <span className="swiper-button-prev" ></span>
            {hystogramDataArray.map((item, index)=>
                <SwiperSlide className={sr.swiper_slide} key={index}>
                    <div className={sr.generalSummory_table_content}>
                        <p>{item.date}</p>
                        <p>{item.total}</p>
                        <p>{item.risks}</p>
                    </div>
                </SwiperSlide>
            )}
        </Swiper>
    );
}

export default SliderResultPage;