const fixedBlock = document.querySelector('.filters-aside__list'),
  headerTopLine = document.querySelector('.header__topline'),
  headerContainer = document.querySelector('.header__container'),
  catalogueTop = document.querySelector('.catalogue__top'),
  filters = document.querySelector('.catalogue__aside'),
  cardsGrid = document.querySelector('.catalogue__inner-grid'),
  container = document.querySelector('.container'),
  offsetLeft = container.offsetLeft + 15,
  filtersOffsetTop = filters.offsetTop + headerContainer.offsetHeight,
  smallOffset = 20,
  productCards = document.querySelectorAll('.product-card'),
  filtersBtn = document.querySelector('.catalogue__showfilter'),
  filtersBtnClose = document.querySelector('.catalogue__aside-close'),
  headerFormBtn = document.querySelector('.catalogue .header__search')
  headerFormBtnClose = document.querySelector('.catalogue .header__form-close');
  
const fixedScrollBlock = () => {
  let scrollDistance = window.scrollY;

  //catalogue top

  if (scrollDistance > headerTopLine.offsetHeight) {
    catalogueTop.classList.add('fixed');
    catalogueTop.style.top = `${headerContainer.offsetHeight}px`;
    cardsGrid.style.marginTop = `${catalogueTop.offsetHeight}px`;
    fixedBlock.style.top = `${headerContainer.offsetHeight + 58}px`;
   
  } else {
    catalogueTop.classList.remove('fixed');
    catalogueTop.style.top = "0px";
    cardsGrid.style.marginTop = "0px";
    filters.style.marginTop = "0px";
    fixedBlock.style.top = "0px";
  }
}

//show-hide filters on mobile

filtersBtn.addEventListener('click', () => {
  filters.classList.add('visible');
  document.body.classList.add('_lock')
})
filtersBtnClose.addEventListener('click', () => {
  filters.classList.remove('visible');
  document.body.classList.remove('_lock')
})

//mask fixed filters

headerFormBtn.addEventListener('click', () => {
  catalogueTop.classList.add('zindexed');
});
headerFormBtnClose.addEventListener('click', () => {
  catalogueTop.classList.remove('zindexed');
});



window.addEventListener('scroll', fixedScrollBlock)