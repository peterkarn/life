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


  @@include('./files/sliders.js', {})
  @@include('./files/spoilers.js', {})
});