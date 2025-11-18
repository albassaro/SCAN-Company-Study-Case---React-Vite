import { React } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/css/grid";

import global from "../styles/globalStyles.module.scss";
import sliderTable from "../styles/components/slider_resultpage.module.scss";

function SliderResultPage(hystogramData) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 375px)",
  });

  const docsInfo = hystogramData.props[0].data.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const docsRisk = hystogramData.props[1].data;

  // Общий массив с данными гистограммы
  const hystogramDataArray = [];

  for (let i = 0; i < docsInfo.length; i++) {
    hystogramDataArray.splice(i, 0, {
      date: new Date(docsInfo[i].date).toLocaleDateString(),
      total: docsInfo[i].value,
      risks: docsRisk[i].value,
    });
  }

  return (
    <div className={sliderTable.MySliderWrapper}>
      <Swiper
        className={sliderTable.MySlider}
        modules={[Navigation]}
        spaceBetween={0}
        {...(isDesktop
          ? hystogramDataArray.length > 8
            ? { slidesPerView: 9 }
            : { slidesPerView: hystogramDataArray.length }
          : isMobile
          ? { slidesPerView: 1 }
          : { slidesPerView: 9 })}
        scrollbar={{ draggable: true }}
        navigation
      >
        {hystogramDataArray.map((item, index) => (
          <SwiperSlide className={sliderTable.swiper_slide} key={index}>
            <div className={sliderTable.generalSummory_table_content}>
              <p>{item.date}</p>

              <p>{item.total}</p>
              <p>{item.risks}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SliderResultPage;
