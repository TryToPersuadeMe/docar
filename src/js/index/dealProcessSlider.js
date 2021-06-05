import SwiperCore, { Navigation, EffectFade, Pagination } from "swiper/core";
SwiperCore.use([Navigation, EffectFade, Pagination]);

import "swiper/swiper-bundle.css";

const responsiveBulltes = () => {
  if (window.innerWidth > 1025) {
    return 7;
  } else if (window.innerWidth > 769) {
    return 4;
  }
};

console.log(responsiveBulltes());

const dealProcessSlider = new SwiperCore(".dealProcess__slider", {
  slidesPerView: 1,
  speed: 1000,
  effect: "fade",
  simulateTouch: false,

  pagination: {
    el: ".dealProcess__pagination",
    clickable: false,
    dynamicBullets: true,
    dynamicMainBullets: responsiveBulltes(),

    renderBullet: function (index, className) {
      return (
        `<span class="${className} progressBarCounter-js">` +
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
    // slideNextTransitionStart: function () {
    //   if (window.innerWidth < 1025) {
    //     const $paginationWrapper = document.querySelector(".customPaginationWrapper");
    //     const $bullets = $paginationWrapper.querySelectorAll(".swiper-pagination-bullet");
    //     const $bullets_enable = document.querySelectorAll(".progressBarCounter-js");
    //     $bullets_enable.forEach((el, indexEl) => {
    //       if (el.classList.contains("swiper-pagination-bullet-active") && el.nextElementSibling.classList.contains("disabled")) {
    //         for (let index = 0; index < $bullets.length; index++) {
    //           if (index < indexEl) {
    //             $bullets[index].classList.add("disabled");
    //             $bullets[index].classList.remove("progressBarCounter-js");
    //           } else {
    //             $bullets[index].classList.remove("disabled");
    //             $bullets[index].classList.add("progressBarCounter-js");
    //           }
    //         }
    //       }
    //     });
    //   }
    // },
  },
});

const progressBar = () => {
  const $activeLine = document.querySelector(".customProgressBar__fillLine");
  const $bullets = document.querySelectorAll(".swiper-pagination-bullet");
  const $bullets_enable = document.querySelectorAll(".progressBarCounter-js");

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

const responsivePagination = () => {
  const $paginationWrapper = document.querySelector(".customPaginationWrapper");
  const $bullets = $paginationWrapper.querySelectorAll(".swiper-pagination-bullet");
  const $bullets_enable = document.querySelectorAll(".progressBarCounter-js");
  const $slider = document.querySelector(".dealProcess");
  let bulletsVisibleGroup = 4;

  if (innerWidth < 769) {
    bulletsVisibleGroup = 3;
  }
  /* прячем лишние буллеты */
  if (window.innerWidth < 1025) {
    for (let index = 0; index < $bullets.length; index++) {
      if (index > bulletsVisibleGroup) {
        $bullets[index].classList.add("disabled");
        $bullets[index].classList.remove("progressBarCounter-js");
      }
    }
  } else {
    for (let index = 0; index < $bullets.length; index++) {
      $bullets[index].classList.remove("disabled");
      $bullets[index].classList.add("progressBarCounter-js");
    }
  }
};

// responsivePagination();
progressBar();

window.addEventListener("resize", () => {
  // responsivePagination();
  progressBar();
});
