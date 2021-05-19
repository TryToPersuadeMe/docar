import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

import "swiper/swiper-bundle.css";

const getCarSlider = new SwiperCore(".getCarSlider__container", {
  spaceBetween: 30,
  slidesPerView: 1,
  speed: 600,
  loop: true,
  navigation: {
    nextEl: ".getCarSlider__arrow_next",
    prevEl: ".getCarSlider__arrow_prev",
  },
});
