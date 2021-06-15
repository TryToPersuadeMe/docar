import SwiperCore, { Navigation, EffectFade, Pagination } from "swiper/core";
SwiperCore.use([Navigation, EffectFade, Pagination]);

import "swiper/swiper-bundle.css";

const responsiveBulltes = () => {
  if (window.innerWidth > 1025) {
    return 7;
  } else if (window.innerWidth > 479) {
    return 4;
  } else if (window.innerWidth > 280) {
    return 1;
  }
};

const dealProcessSlider = new SwiperCore(".dealProcess__slider", {
  slidesPerView: 1,
  speed: 1000,
  effect: "fade",
  simulateTouch: false,

  pagination: {
    el: ".dealProcess__pagination",
    clickable: false,
    dynamicBullets: true,
    clickable: true,
    dynamicMainBullets: responsiveBulltes(),

    renderBullet: function (index, className) {
      return (
        `<span class="${className} ">` +
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

  on: {
    slideChange: function () {
      if (window.innerWidth < 1025) {
        const $paginationWrapper = document.querySelector(".customPaginationWrapper");
        const $bullets = $paginationWrapper.querySelectorAll(".swiper-pagination-bullet");
        const $responsiveLine = document.querySelectorAll(".bulletGroup");
        const $activeLine = document.querySelector(".customProgressBar__fillLine");

        if (this.activeIndex > 2) {
          $bullets.forEach((el, index) => {
            if (index < 3) {
              el.style.display = "none";
              el.classList.remove("bulletGroup");
            } else {
              el.classList.add("bulletGroup");
              el.style.display = "flex";
            }
          });
        } else {
          $bullets.forEach((el, index) => {
            if (index > 3) {
              el.classList.remove("bulletGroup");
              el.style.display = "none";
            } else {
              el.classList.add("bulletGroup");
              el.style.display = "flex";
            }
          });
        }

        if (this.activeIndex == 3) {
          $activeLine.style.width = 33 + "%";
          $activeLine.style.minWidth = 33 + "%";
        } else if (this.activeIndex == 4) {
          $activeLine.style.width = 66 + "%";
          $activeLine.style.minWidth = 66 + "%";
        } else if (this.activeIndex == 5) {
          $activeLine.style.width = 99 + "%";
          $activeLine.style.minWidth = 99 + "%";
        }
      }
    },
  },
});

const progressBar = () => {
  const $activeLine = document.querySelector(".customProgressBar__fillLine");
  const $bullets = document.querySelectorAll(".swiper-pagination-bullet");
  const $bullets_enable = document.querySelectorAll(".swiper-pagination-bullet-active-main");

  let bullets_length = $bullets_enable.length - 1;

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

const dotsTitle = () => {
  const $titles = document.querySelectorAll(".dealProcess__slideTitle");
  const $bullets = document.querySelectorAll(".swiper-pagination-bullet");
  $titles.forEach((el, index) => {
    const $textBox = $bullets[index].querySelector(".text");

    $textBox.innerText = $titles[index].innerText;
  });
};
dotsTitle();

progressBar();

window.addEventListener("resize", () => {
  progressBar();
});
