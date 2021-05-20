import SwiperCore, { Navigation, EffectFade, Pagination } from "swiper/core";
SwiperCore.use([Navigation, EffectFade, Pagination]);

import "swiper/swiper-bundle.css";

const dealProcessSlider = new SwiperCore(".dealProcess__slider", {
  slidesPerView: 1,
  speed: 1000,
  effect: "fade",
  simulateTouch: false,

  pagination: {
    el: ".dealProcess__pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return (
        `<span class="${className}">` +
        `<span class="counter">${index + 1}</span>` +
        `<span class="activeEffect"></span>` +
        `<span class="text"></span>` +
        "</span>"
      );
    },
  },

  navigation: {
    nextEl: ".dealProcess__arrow_next",
    prevEl: ".dealProcess__arrow_prev",
  },
});

const progressBar = () => {
  const $activeLine = document.querySelector(".customProgressBar__fillLine");
  const $bullets = document.querySelectorAll(".swiper-pagination-bullet");

  let bullets_length = $bullets.length - 1;

  $activeLine.style.minWidth = (1 / bullets_length) * 100 + "%";
  $bullets[0].classList.add("active");

  dealProcessSlider.on("realIndexChange", function () {
    $activeLine.style.width = ((dealProcessSlider.realIndex + 1) / bullets_length) * 100 + "%";

    for (let index = 0; index < $bullets.length; index++) {
      if (index < dealProcessSlider.realIndex + 1) {
        $bullets[index].classList.add("active");
      } else {
        $bullets[index].classList.remove("active");
      }
    }
  });
};

progressBar();

const dotsTitle = () => {
  const $titles = document.querySelectorAll(".dealProcess__slideTitle");
  const $bullets = document.querySelectorAll(".swiper-pagination-bullet");
  $titles.forEach((el, index) => {
    const $textBox = $bullets[index].querySelector(".text");

    $textBox.innerText = $titles[index].innerText;
  });
};
dotsTitle();
