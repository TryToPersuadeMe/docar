import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
const $dateSlider = document.querySelectorAll(".calculator__noUiSliderWrapper");
const $from_num = document.querySelector(".calculator__from");

const $showResult = document.querySelectorAll(".calculator__customInput");

$dateSlider.forEach((el, index) => {
  let minNum, maxNum, multiplier, endfix;

  switch (el.offsetParent.getAttribute("id")) {
    case "cost":
      (minNum = 5000), (maxNum = 25000), (multiplier = 1000), (endfix = " ₽");
      break;

    case "firstPayment":
      (minNum = 1), (maxNum = 100), (multiplier = 1000), (endfix = " ₽");
      break;

    case "period":
      (minNum = 6), (maxNum = 32), (multiplier = 1), (endfix = " меc.");
      break;
  }

  noUiSlider.create(el, {
    start: 500,
    step: 1,
    connect: [true, false],
    range: {
      min: minNum,
      max: maxNum,
    },
  });

  el.noUiSlider.on("update", (values) => {
    let result = `${Math.round(values[0] * multiplier).toLocaleString()}`;
    $showResult[index].innerText = result + endfix;

    let note = el.offsetParent.querySelector(".calculator__note");
    if (note) {
      let endfix = note.dataset.endfix_note;

      note.innerText = Math.round(values[0]) + endfix;
    }
  });
});
