import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);

const featuresSlider = new SwiperCore(".features__sliderContainer", {
  spaceBetween: 20,
  speed: 600,

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    481: {
      slidesPerView: "auto",
    },
  },

  pagination: {
    el: ".features__pagination",
    clickable: true,
  },

  on: {
    beforeInit: function () {
      if (window.innerWidth > 768) {
        featuresSlider.destroy();
      }
    },

    resize: function () {
      if (window.innerWidth > 768) {
        featuresSlider.destroy();
      }
    },
  },
});
