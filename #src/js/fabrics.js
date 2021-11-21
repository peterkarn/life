const cards = document.querySelectorAll(".cards__item");
const sidebar = document.querySelector(".cards__sidebar");
const sidebarCloseBtn = document.querySelector(".cards__sidebar-btn");
const btn = document.querySelectorAll(".fabrics__menu-showbtn");
chooseButtons = document.querySelectorAll("[data-choose]");
cards.forEach((card) => {
  card.addEventListener("click", function () {
    sidebar.classList.add("active");
    console.log("Carta");
  });
});

sidebarCloseBtn.addEventListener("click", function () {
  sidebar.classList.remove("active");
});

chooseButtons.forEach((block) => {
  block.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const current = block.querySelector("._active");
      current.classList.remove("_active");
      e.target.classList.add("_active");
    }
  });
});

cards.forEach((card) => {
  card.addEventListener("click", function () {
    sidebar.classList.add("active");
    const cardPreview = this.dataset.preview;
    const cardTitle = this.dataset.title;
    const cardDescr = this.dataset.descr;
    const cardCategory = this.dataset.category;
    const cardSecondCategory = this.dataset.secondcategory;
    const sidebarImage = sidebar.querySelector(".sidebar__image");
    const sidebarTitle = sidebar.querySelector(".sidebar__title");
    const sidebarDescr = sidebar.querySelector(".sidebar__descr");
    const sidebarCategory = sidebar.querySelector(".sidebar__category");
    const sidebarSecondCategory = sidebar.querySelector(
      ".sidebar__second-category"
    );
    sidebarTitle.innerHTML = cardTitle;
    sidebarDescr.innerHTML = cardDescr;
    sidebarCategory.innerHTML = cardCategory;
    sidebarSecondCategory.innerHTML = cardSecondCategory;
    sidebarImage.style.backgroundImage = `url(${cardPreview})`;
    console.log(cardPreview);
    // sidebarCategory.innerHTML = cardCategory;
  });
});
