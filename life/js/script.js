document.addEventListener('DOMContentLoaded', function () {
  const
    header = document.querySelector('.header'),
    searchBtn = document.querySelector('.header__search'),
    body = document.body,
    iconMenu = document.querySelector('.menu__icon'),
    closeMenuBtn = document.querySelector('.menu__body-close'),
    menuBody = document.querySelector('.menu__body'),
    searchForm = document.querySelector('.header__form'),
    closeFormBtn = searchForm.querySelector('.header__form-close'),
    headerInput = document.querySelector('.header__form-input'),
    headerResults = document.querySelector('.header__results'),
    lockMarginValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px',
    chooseButtons = document.querySelectorAll('[data-choose]'),
    filters = document.querySelectorAll('.filter'),
    multiplyBtn = document.querySelectorAll('[data-multiply]'),
    isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows());
      }
    };
   

  if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
        const menuArrow = menuArrows[index];
        menuArrow.addEventListener("click", function (e) {
          menuArrow.parentElement.classList.toggle('_active');
        });
      }
    }

  } else {
    body.classList.add('_pc');
  }

  function pageMarginAdd() {
    body.style.marginRight = lockMarginValue
  }

  function pageMarginRemove() {
    body.style.marginRight = ''
  }

  // Меню бургер
  if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
      body.classList.add('_lock');
      iconMenu.classList.add('_active');
      menuBody.classList.add('_active');
    });
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", function (e) {
      body.classList.remove('_lock');
      iconMenu.classList.remove('_active');
      menuBody.classList.remove('_active');
    });
  }
  
  //fixed elements

  window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    let topLineMenuHeight = document.querySelector('.header__topline').offsetHeight;
    let headerheight = document.querySelector('.header').offsetHeight;

    if (scrollDistance > topLineMenuHeight) {
      header.classList.add('fixed');
      header.style.top = -topLineMenuHeight + 'px';
      body.style.paddingTop = headerheight + 'px';
    }

    if (scrollDistance < topLineMenuHeight) {
      header.classList.remove('fixed');
      header.style.top = "";
      body.style.paddingTop = "";
    }
  });



  //search form
   
  searchBtn.addEventListener('click', () => {
    searchForm.classList.add('visible');
    body.classList.add('covered');
    body.classList.add('_lock');
    pageMarginAdd();
  });

  closeFormBtn.addEventListener('click', () => {
    searchForm.classList.remove('visible');
    body.classList.remove('covered');
    body.classList.remove('_lock');
     headerResults.classList.remove('visible');
    pageMarginRemove();
  });

  //send request from the form

  const getResource = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`)
    }

    return await response.json();
  };

  headerInput.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        getResource('https://fakestoreapi.com/products/').then((data) => {
        console.log(data);
        headerResults.classList.add('visible');
      });
    } else {
      headerResults.classList.remove('visible');
    }
  });

  // view full reply

  const reviewSection = document.querySelector('.feedback');

  if (reviewSection) {
  reviewSection.addEventListener('click', (e) => {
    if (e.target.matches('.item-feedback__btn')) {
      e.target.closest('.item-feedback').classList.toggle('expanded');
    }
  });
  };

  //map

  if (document.querySelector('#map')) {
    let map;

     function init() {
       map = new ymaps.Map('map', {
         center: [59.900504775127686, 30.31272717591858],
         zoom: 10,
       });
         
       map.controls.remove('geolocationControl'); // удаляем геолокацию
       map.controls.remove('searchControl'); // удаляем поиск
       map.controls.remove('trafficControl'); // удаляем контроль трафика
       map.controls.remove('typeSelector'); // удаляем тип
       map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
      //  map.controls.remove('zoomControl'); // удаляем контрол зуммирования
       map.controls.remove('rulerControl'); // удаляем контрол правил
       map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

      //добавление точек на карте в массив класть координаты нужной точки с сервиса https://yandex.ru/map-constructor/location-tool/
       
       map.geoObjects
        .add(new ymaps.Placemark([59.900504775127686, 30.31272717591858], {}, {}))
        .add(new ymaps.Placemark([59.85575793467128, 30.2243752116394], {}, {}))

     }
    
    ymaps.ready(init)

    document.querySelectorAll('.showrooms__adress').forEach(adress => {
      adress.addEventListener('click', (e) => {
        let coords = e.target.dataset.coordinates
          .slice(1, -1)
          .split(",")
          .map(i => +i);
        map.setCenter(coords, 17);
      })
    });
  }

  // reorder table columns


  if (document.querySelector('.showrooms__table')) {
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
      const phoneCell = row.querySelector('.showrooms__tel');
        
      function switchCell() {
        if (window.matchMedia("(max-width: 475px)").matches) {
          row.insertAdjacentHTML('afterbegin',
            `
                <td>${phoneCell.innerHTML}</td>
              `
          );
          phoneCell.style.display = "none";
        }
      };
      switchCell();
    });
  }


  // expand similar products list


  if (document.querySelector('.product-configs__expand')) {
    const expandListBtn = document.querySelector('.product-configs__expand');
    const configsList = document.querySelector('.product-configs__list')
    expandListBtn.addEventListener('click', () => {
      configsList.classList.toggle('collapsed')
    })
  }

  //calculate price base on category

  if (document.querySelector('#price')) {
    let basePrice = document.querySelector('#price').innerHTML;

    function calculatePrice(multiplier) {
      let priceValue = document.querySelector('#price');
      let result = +basePrice * multiplier;
      priceValue.innerHTML = result.toString();
    }

    if (multiplyBtn) {
      multiplyBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
          let mult = +btn.dataset.multiply;
          calculatePrice(mult);
        });
      });
    }
  }

  //choose proper category of product

  chooseButtons.forEach(block => {
    block.addEventListener('click', (e) => {
      if (e.target.matches('button')) {
        const current = block.querySelector('.current');
        current.classList.remove('current');
        e.target.classList.add('current');
      }
    });
  });

  //filter

  if (filters) {
    filters.forEach(filter => {
      filter.addEventListener('click', function () {
        let selectedFilter = filter.getAttribute('data-filter');
        let itemsToHide = document.querySelectorAll(`.configurator__colors li:not([data-filter='${selectedFilter}'])`);
        let itemsToShow = document.querySelectorAll(`.configurator__colors li[data-filter='${selectedFilter}']`);
        if (selectedFilter == 'all') {
          itemsToHide = [];
          itemsToShow = document.querySelectorAll('.projects [data-filter]');
        }

        itemsToHide.forEach(el => {
          el.classList.add('hide');
          el.classList.remove('show');
        });

        itemsToShow.forEach(el => {
          el.classList.remove('hide');
          el.classList.add('show');
        });
      });
    });
  }

  //choose orientation

  if (document.querySelectorAll('.orientation-block__btns')) {
    const orientationBlock = document.querySelectorAll('.orientation-block__btns');
     orientationBlock.forEach(block => {
       block.addEventListener('click', (e) => {
         if (e.target.matches('button')) {
           const current = block.querySelector('.current');
           current.classList.remove('current');
           e.target.classList.add('current');
         }
       });
     });
  }

  // modals 

  if (document.querySelector('[data-hystmodal')) {
    const myModal = new HystModal({
      linkAttributeName: "data-hystmodal",
    });
  }

  // fabrics buttons

  if (document.querySelector(".configurator__colors")) {
    const btns = document.querySelectorAll(".configurator__colors button");

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("selected")
      })
    })
  }

  // filter 

  if (document.querySelector(".wrapper.catalogue")) {
      const showFiltersBtn = document.querySelector(".catalogue__showfilter");
      const filtersBlock = document.querySelector(".catalogue__aside");
      const filtersCloseBtn = document.querySelector(".catalogue__aside-close"); 

      showFiltersBtn.addEventListener('click', () => {
        filtersBlock.classList.add("visible");
        body.classList.add("_lock")
      })

      filtersCloseBtn.addEventListener('click', () => {
          filtersBlock.classList.remove("visible")
          body.classList.remove("_lock")
      })
  }


  // слайдер в шапке

new Splide(".header__topline-container", {
  pagination: false,
  arrows: false,
  autoWidth: true,
  gap: "50px",
  breakpoints: {
    720: {
      gap: 15,
    },
  },
}).mount();

// main slider

if (document.querySelector(".hero__slider")) {
  new Splide(".hero__slider", {
    arrows: false,
    autoplay: true,
  }).mount();
}

// models slider

if (document.querySelector(".models__slider")) {
  new Splide(".models__slider", {
    arrows: false,
    autoWidth: true,
    pagination: false,
    gap: 10,
  }).mount();
}

// toprated slider

if (document.querySelector(".toprated__slider")) {
  new Splide(".toprated__slider", {
    arrows: true,
    autoWidth: true,
    pagination: true,
    perMove: 1,
    type: "loop",
    gap: 30,
    breakpoints: {
      375: {
        gap: 30,
        autowidth: false,
        perPage: 1,
        focus: "center",
      },
    },
  }).mount();
}

// toprated slider

if (document.querySelector(".collections__slider")) {
  new Splide(".collections__slider", {
    arrows: true,
    autoWidth: true,
    pagination: false,
    perMove: 1,
    type: "loop",
    gap: 30,
    breakpoints: {
      1200: {
        arrows: false,
        pagination: true,
      },
    },
  }).mount();
}

// // projects slider

if (document.querySelector(".projects__slider")) {
  new Splide(".projects__slider", {
    arrows: true,
    pagination: false,
    perMove: 1,
    perPage: 3,
    gap: 30,
    type: "loop",
    breakpoints: {
      1200: {
        arrows: false,
        pagination: true,
      },
      960: {
        arrows: false,
        perPage: 2,
        pagination: true,
      },
      720: {
        arrows: false,
        perPage: 1,
        pagination: true,
      },
    },
  }).mount();
}

// // feedback slider

if (document.querySelector(".feedback__slider")) {
  const feedbackSlider = new Splide(".feedback__slider", {
    arrows: false,
    pagination: false,
    perMove: 1,
    perPage: 2,
    gap: 180,
    autoplay: true,
    speed: 800,
    interval: 3000,
    type: "loop",
    autoHeight: true,
    breakpoints: {
      1200: {
        gap: 30,
      },
      720: {
        perPage: 1,
      },
    },
  }).mount();

  feedbackSlider.on("move", () => {
    document.querySelectorAll(".item-feedback.expanded").forEach((item) => {
      item.classList.remove("expanded");
    });
  });
}

if (document.querySelector(".sliders-block")) {
  var secondarySlider = new Splide(".bottom-carousel__slider", {
    rewind: true,
    fixedWidth: 164,
    fixedHeight: 102,
    isNavigation: true,
    gap: 25,
    focus: "center",
    pagination: false,
    cover: true,
    arrows: false,
    breakpoints: {
      375: {
        fixedWidth: 66,
        fixedHeight: 40,
      },
    },
  }).mount();

  // Create the main slider.
  var primarySlider = new Splide(".top-carousel__slider", {
    type: "fade",
    heightRatio: 0.5,
    pagination: false,
    arrows: false,
    cover: true,
    breakpoints: {
      720: {
        heightRatio: 0.5,
      },
    },
  });

  // Set the thumbnails slider as a sync target and then call mount.
  primarySlider.sync(secondarySlider).mount();
}

if (document.querySelector(".similar__wrapper")) {
  new Splide(".similar__wrapper", {
    perPage: 3,
    gap: 30,
    arrows: true,
    pagination: false,
    breakpoints: {
      960: {
        arrows: false,
        perPage: 2,
        pagination: true,
      },
      720: {
        arrows: false,
        perPage: 2,
        pagination: true,
        gap: 10,
      },
    },
  }).mount();
}

if (document.querySelector(".collections-block__wrapper")) {
  new Splide(".collections-block__wrapper", {
    perPage: 4,
    gap: 30,
    arrows: true,
    pagination: false,
    type: "loop",
    breakpoints: {
      960: {
        arrows: false,
        perPage: 3,
        pagination: true,
      },
      720: {
        arrows: false,
        perPage: 2,
        pagination: true,
        gap: 10,
      },
    },
  }).mount();
}

if (document.querySelector(".diploma__slider")) {
  new Splide(".diploma__slider", {
    autoWidth: true,
    gap: "80px",
    arrows: false,
    breakpoints: {
      1200: {
        gap: "30px",
      },
      768: {
        gap: "15px",
      },
    },
  }).mount();
}

if (document.querySelector(".sales__slider")) {
  new Splide(".sales__slider", {
    perPage: 2,
    arrows: false,
    gap: "35px",
    breakpoints: {
      768: {
        perPage: 2,
        arrows: false,
      },
      540: {
        perPage: 1.5,
      },
      475: {
        perPage: 1,
      },
    },
  }).mount();
}
if (document.querySelector(".process__slider")) {
  new Splide(".process__slider", {
    perPage: 3,
    gap: "20px",
    pagination: true,
    breakpoints: {
      768: {
        perPage: 2,
        arrows: false,
      },
      540: {
        perPage: 1.5,
      },
      475: {
        perPage: 1,
      },
    },
  }).mount();
}

if (document.querySelector(".showroom__slider")) {
  new Splide(".showroom__slider", {
    perPage: 3,
    gap: "40px",
    arrows: true,
    breakpoints: {
      768: {
        perPage: 2,
        arrows: false,
      },
      540: {
        perPage: 1.5,
      },
      475: {
        perPage: 1,
      },
    },
  }).mount();
}

   // spollers
 const spollersArray = document.querySelectorAll('[data-spollers]');
 if (spollersArray.length > 0) {
   // Получение обычных слойлеров
   const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
     return !item.dataset.spollers.split(",")[0];
   });
   // Инициализация обычных слойлеров
   if (spollersRegular.length > 0) {
     initSpollers(spollersRegular);
   }

   // Получение слойлеров с медиа запросами
   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
     return item.dataset.spollers.split(",")[0];
   });

   // Инициализация слойлеров с медиа запросами
   if (spollersMedia.length > 0) {
     const breakpointsArray = [];
     spollersMedia.forEach(item => {
       const params = item.dataset.spollers;
       const breakpoint = {};
       const paramsArray = params.split(",");
       breakpoint.value = paramsArray[0];
       breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
       breakpoint.item = item;
       breakpointsArray.push(breakpoint);
     });

     // Получаем уникальные брейкпоинты
     let mediaQueries = breakpointsArray.map(function (item) {
       return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
     });
     mediaQueries = mediaQueries.filter(function (item, index, self) {
       return self.indexOf(item) === index;
     });

     // Работаем с каждым брейкпоинтом
     mediaQueries.forEach(breakpoint => {
       const paramsArray = breakpoint.split(",");
       const mediaBreakpoint = paramsArray[1];
       const mediaType = paramsArray[2];
       const matchMedia = window.matchMedia(paramsArray[0]);

       // Объекты с нужными условиями
       const spollersArray = breakpointsArray.filter(function (item) {
         if (item.value === mediaBreakpoint && item.type === mediaType) {
           return true;
         }
       });
       // Событие
       matchMedia.addListener(function () {
         initSpollers(spollersArray, matchMedia);
       });
       initSpollers(spollersArray, matchMedia);
     });
   }
   // Инициализация
   function initSpollers(spollersArray, matchMedia = false) {
     spollersArray.forEach(spollersBlock => {
       spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
       if (matchMedia.matches || !matchMedia) {
         spollersBlock.classList.add('_init');
         initSpollerBody(spollersBlock);
         spollersBlock.addEventListener("click", setSpollerAction);
       } else {
         spollersBlock.classList.remove('_init');
         initSpollerBody(spollersBlock, false);
         spollersBlock.removeEventListener("click", setSpollerAction);
       }
     });
   }
   // Работа с контентом
   function initSpollerBody(spollersBlock, hideSpollerBody = true) {
     const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
     if (spollerTitles.length > 0) {
       spollerTitles.forEach(spollerTitle => {
         if (hideSpollerBody) {
           spollerTitle.removeAttribute('tabindex');
           if (!spollerTitle.classList.contains('_active')) {
             spollerTitle.nextElementSibling.hidden = true;
           }
         } else {
           spollerTitle.setAttribute('tabindex', '-1');
           spollerTitle.nextElementSibling.hidden = false;
         }
       });
     }
   }

   function setSpollerAction(e) {
     const el = e.target;
     if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
       const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
       const spollersBlock = spollerTitle.closest('[data-spollers]');
       const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
       if (!spollersBlock.querySelectorAll('._slide').length) {
         if (oneSpoller && !spollerTitle.classList.contains('_active')) {
           hideSpollersBody(spollersBlock);
         }
         spollerTitle.classList.toggle('_active');
         _slideToggle(spollerTitle.nextElementSibling, 500);
       }
       e.preventDefault();
     }
   }

   function hideSpollersBody(spollersBlock) {
     const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
     if (spollerActiveTitle) {
       spollerActiveTitle.classList.remove('_active');
       _slideUp(spollerActiveTitle.nextElementSibling, 500);
     }
   }
 }
 //========================================================================================================================================================
 //SlideToggle
 let _slideUp = (target, duration = 500) => {
   if (!target.classList.contains('_slide')) {
     target.classList.add('_slide');
     target.style.transitionProperty = 'height, margin, padding';
     target.style.transitionDuration = duration + 'ms';
     target.style.height = target.offsetHeight + 'px';
     target.offsetHeight;
     target.style.overflow = 'hidden';
     target.style.height = 0;
     target.style.paddingTop = 0;
     target.style.paddingBottom = 0;
     target.style.marginTop = 0;
     target.style.marginBottom = 0;
     window.setTimeout(() => {
       target.hidden = true;
       target.style.removeProperty('height');
       target.style.removeProperty('padding-top');
       target.style.removeProperty('padding-bottom');
       target.style.removeProperty('margin-top');
       target.style.removeProperty('margin-bottom');
       target.style.removeProperty('overflow');
       target.style.removeProperty('transition-duration');
       target.style.removeProperty('transition-property');
       target.classList.remove('_slide');
     }, duration);
   }
 }
 let _slideDown = (target, duration = 500) => {
   if (!target.classList.contains('_slide')) {
     target.classList.add('_slide');
     if (target.hidden) {
       target.hidden = false;
     }
     let height = target.offsetHeight;
     target.style.overflow = 'hidden';
     target.style.height = 0;
     target.style.paddingTop = 0;
     target.style.paddingBottom = 0;
     target.style.marginTop = 0;
     target.style.marginBottom = 0;
     target.offsetHeight;
     target.style.transitionProperty = "height, margin, padding";
     target.style.transitionDuration = duration + 'ms';
     target.style.height = height + 'px';
     target.style.removeProperty('padding-top');
     target.style.removeProperty('padding-bottom');
     target.style.removeProperty('margin-top');
     target.style.removeProperty('margin-bottom');
     window.setTimeout(() => {
       target.style.removeProperty('height');
       target.style.removeProperty('overflow');
       target.style.removeProperty('transition-duration');
       target.style.removeProperty('transition-property');
       target.classList.remove('_slide');
     }, duration);
   }
 }
 let _slideToggle = (target, duration = 500) => {
   if (target.hidden) {
     return _slideDown(target, duration);
   } else {
     return _slideUp(target, duration);
   }
 }
});