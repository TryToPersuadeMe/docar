import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

const $dateSlider = document.querySelectorAll(".calculator__noUiSliderWrapper");

const $showResult = document.querySelectorAll(".calculator__customInput");

window.addEventListener("load", () => {
  /* умножает все цифры на это число */
  let multiplier = 1000;
  /* основная процентная ставка */
  const mainRate = 19.3;

  $dateSlider.forEach((el, index) => {
    let minNum, maxNum, endfix, oneStep, customStart;

    switch (el.offsetParent.getAttribute("id")) {
      case "cost":
        (minNum = 300), (maxNum = 10000), (endfix = " ₽"), (oneStep = 5), (customStart = 300);
        break;

      case "firstPayment":
        (minNum = 10), (maxNum = 49), (endfix = " ₽"), (oneStep = 5), (customStart = 10);
        break;

      case "period":
        (minNum = 12), (maxNum = 60), (endfix = " меc."), (oneStep = 12), (customStart = 12);
        break;
    }

    noUiSlider.create(el, {
      start: customStart,
      step: oneStep,
      connect: [true, false],
      range: {
        min: minNum,
        max: maxNum,
      },
    });

    el.noUiSlider.on("update", (values) => {
      /* отключаем множитель, если ползунок - период */
      if (el.offsetParent.getAttribute("id") != "period") {
        let result = `${Math.round(values[0] * multiplier).toLocaleString()}`;
        $showResult[index].innerText = result + endfix;
      } else {
        let result = `${Math.round(values[0]).toLocaleString()}`;
        $showResult[index].innerText = result + endfix;
      }

      /* считываем процент аванса */
      let note = el.offsetParent.querySelector(".calculator__note");
      if (note) {
        let endfix = note.dataset.endfix_note;
        note.innerText = Math.round(values[0]) + endfix;
      }

      const $firstPayment = document.querySelector("#firstPayment");
      const $cost = document.querySelector("#cost");
      const $firstPayment_percents = parseInt($firstPayment.querySelector(".calculator__note").innerText);
      const $firstPayment_customInput = $firstPayment.querySelector(".calculator__customInput");
      const $firstPayment_handle = $cost.querySelector(".noUi-handle");
      const currentCost = $firstPayment_handle.getAttribute("aria-valuenow") * multiplier;

      if (el.offsetParent.getAttribute("id") == "cost" || el.offsetParent.getAttribute("id") == "firstPayment") {
        /* парсим значение в аванс */
        $firstPayment_customInput.innerText = ((currentCost / 100) * $firstPayment_percents).toLocaleString();
      }

      function totalChangeValue() {
        const $regularPayment = document.querySelector("#regularPayment");
        const $totalPayment = document.querySelector("#totalPayment");
        const $returnNDS = document.querySelector("#returnNDS");
        const $decreaseTax = document.querySelector("#decreaseTax");

        let taxRate;

        const $period = parseInt(document.querySelector("#period").querySelector(".calculator__customInput").innerText);
        const $period_years = $period / 12;

        if ($firstPayment_percents == 10) {
          switch ($period_years) {
            case 1:
              taxRate = 11.55;
              break;
            case 2:
              taxRate = 10.19;
              break;
            case 3:
              taxRate = 9.74;
              break;
            case 4:
              taxRate = 9.52;
              break;
            case 5:
              taxRate = 9.96;
              break;
          }
        }

        if ($firstPayment_percents == 15) {
          switch ($period_years) {
            case 1:
              taxRate = 11.55;
              break;
            case 2:
              taxRate = 10.06;
              break;
            case 3:
              taxRate = 9.58;
              break;
            case 4:
              taxRate = 9.35;
              break;
            case 5:
              taxRate = 9.76;
              break;
          }
        }

        if ($firstPayment_percents == 20) {
          switch ($period_years) {
            case 1:
              taxRate = 11.06;
              break;
            case 2:
              taxRate = 9.61;
              break;
            case 3:
              taxRate = 9.14;
              break;
            case 4:
              taxRate = 8.91;
              break;
            case 5:
              taxRate = 9.29;
              break;
          }
        }

        if ($firstPayment_percents == 25) {
          switch ($period_years) {
            case 1:
              taxRate = 10.58;
              break;
            case 2:
              taxRate = 9.15;
              break;
            case 3:
              taxRate = 8.69;
              break;
            case 4:
              taxRate = 8.47;
              break;
            case 5:
              taxRate = 8.83;
              break;
          }
        }

        if ($firstPayment_percents == 30) {
          switch ($period_years) {
            case 1:
              taxRate = 10.09;
              break;
            case 2:
              taxRate = 8.7;
              break;
            case 3:
              taxRate = 8.25;
              break;
            case 4:
              taxRate = 8.04;
              break;
            case 5:
              taxRate = 8.36;
              break;
          }
        }

        if ($firstPayment_percents == 35) {
          switch ($period_years) {
            case 1:
              taxRate = 9.5;
              break;
            case 2:
              taxRate = 8.25;
              break;
            case 3:
              taxRate = 7.81;
              break;
            case 4:
              taxRate = 7.6;
              break;
            case 5:
              taxRate = 7.9;
              break;
          }
        }

        if ($firstPayment_percents == 40) {
          switch ($period_years) {
            case 1:
              taxRate = 9.11;
              break;
            case 2:
              taxRate = 7.79;
              break;
            case 3:
              taxRate = 7.37;
              break;
            case 4:
              taxRate = 7.16;
              break;
            case 5:
              taxRate = 7.43;
              break;
          }
        }

        if ($firstPayment_percents == 45) {
          switch ($period_years) {
            case 1:
              taxRate = 8.63;
              break;
            case 2:
              taxRate = 7.34;
              break;
            case 3:
              taxRate = 6.92;
              break;
            case 4:
              taxRate = 6.72;
              break;
            case 5:
              taxRate = 6.97;
              break;
          }
        }

        if ($firstPayment_percents == 49) {
          switch ($period_years) {
            case 1:
              taxRate = 8.23;
              break;
            case 2:
              taxRate = 6.98;
              break;
            case 3:
              taxRate = 6.57;
              break;
            case 4:
              taxRate = 6.38;
              break;
            case 5:
              taxRate = 6.6;
              break;
          }
        }

        /* сумма договора лизинга */
        let totalPayment = (currentCost / 100) * (taxRate * $period_years) + currentCost;
        $totalPayment.innerText = Math.round(totalPayment).toLocaleString();

        /* ежемесячный платеж */
        let regularPayment = totalPayment / $period;
        $regularPayment.innerText = Math.round(regularPayment).toLocaleString();

        /* Возврат НДС */
        let returnNDS = (totalPayment / 120) * 20;
        $returnNDS.innerText = Math.round(returnNDS).toLocaleString();

        /* снижение налога на прибыль */
        let decreaseTax = ((totalPayment - returnNDS) / 100) * 20;
        $decreaseTax.innerText = Math.round(decreaseTax).toLocaleString();
      }

      totalChangeValue();
    });
  });
});
