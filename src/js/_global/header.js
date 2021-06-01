class responsiveHeader {
  constructor(props) {
    this.$navigation = document.querySelector(props.navigation);
    this.$burgerIcon = document.querySelector(props.burgerIcon);

    this.$header = document.querySelector(".header");

    this.overlay = "overlay";
    this.$htmlBody = document.querySelector("body");

    this.BurgerClick();
    this.WindowClick();
  }

  openState() {
    this.$navigation.classList.add("active");
    this.$burgerIcon.classList.add("active");
    this.$htmlBody.classList.add(this.overlay);

    this.$header.classList.add("opened");
  }

  closeState() {
    this.$navigation.classList.remove("active");
    this.$burgerIcon.classList.remove("active");
    this.$htmlBody.classList.remove(this.overlay);

    this.$header.classList.remove("opened");
  }

  BurgerClick() {
    this.$burgerIcon.addEventListener("click", () => {
      if (!event.currentTarget.classList.contains("active")) {
        this.openState();
      } else {
        this.closeState();
      }
    });
  }

  WindowClick() {
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains(this.overlay)) {
        this.closeState();
      }
    });
  }
}

const headerBurgerMenu = new responsiveHeader({
  navigation: ".header__navigation",
  burgerIcon: ".burgerIcon",
});
