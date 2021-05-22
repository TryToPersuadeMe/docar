const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

document.addEventListener("click", () => {
  let $window;
  const $header = document.querySelector(".header");

  if (event.target.classList.contains("call-popUp-js")) {
    event.preventDefault();
    /* фиксируем header */
    $header.classList.add("header_fixedState");

    animateCSS(".header", "bounceInDown");

    /* анимация, которая срабатывает при нажатии на кнопку вызова */
    event.target.classList.add("animationPopUpOpen");

    let window_num = event.target.dataset.window;
    $window = document.querySelector(`#popUpWindow-js-${window_num}`);

    setTimeout(() => {
      $window.classList.add("popUp_active");
    }, 300);

    /* класс с оверлеем. Выключает скролл */
    document.body.classList.add("block");
  }
  /* закрытие окна по клику на кнопку закрытия */
  if (event.target.classList.contains("popUp__closeButton")) {
    const $activePopUp = document.querySelector(".popUp_active");
    const $mutatedButton = document.querySelector(".animationPopUpOpen");
    $activePopUp.classList.remove("popUp_active");

    /* возвращаем header */
    animateCSS(".header", "bounceOutUp").then((message) => {
      $header.classList.remove("header_fixedState");
      $mutatedButton.classList.remove("animationPopUpOpen");
    });

    /* возвращаем скролл страницы */
    document.body.classList.remove("block");
  }
});
