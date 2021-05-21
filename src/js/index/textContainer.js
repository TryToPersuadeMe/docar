const changeTextContainerState = () => {
  const $clickableWrapper = document.querySelectorAll(".toggleTextItem");
  const $totalWrapper = document.querySelector(".FAQ__column");

  /* при клике на один, закрыавем остальные */
  const closeAllElements = () => $clickableWrapper.forEach((el) => el.classList.remove("active"));

  $totalWrapper.addEventListener("click", () => {
    const $elParent = event.target.parentNode;

    if (
      event.target.classList.contains("toggleTextItem__title") &&
      !$elParent.classList.contains("active") &&
      !event.target.classList.contains("permanentActive")
    ) {
      closeAllElements();
      $elParent.classList.add("active");
    } else if ($elParent.classList.contains("active")) {
      $elParent.classList.remove("active");
    }
  });
};
changeTextContainerState();
