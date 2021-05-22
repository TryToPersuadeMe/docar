import IMask from "imask";

const phoneMask = () => {
  const $phoneInputs = document.querySelectorAll(".phone-mask-js");

  $phoneInputs.forEach((el) => {
    const mask = IMask(el, {
      mask: "+{7} (000) 000 00 00",
    });
  });
};
phoneMask();
