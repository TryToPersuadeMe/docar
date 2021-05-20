const changeTextContainerState = () => {
  const $containers = document.querySelectorAll(".toggleTextItem__dropdown");
  const $clickableWrapper = document.querySelectorAll(".toggleTextItem");
  $clickableWrapper.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.add("active");
    });
  });
};
changeTextContainerState();
