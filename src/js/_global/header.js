const select = () => {
  const $wrapper = document.querySelectorAll(".navigation__select");
  $wrapper.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.classList.add("open");
    });

    el.addEventListener("mouseleave", () => {
      el.classList.remove("open");
    });
  });
};
select();
