// слайдер в шапке

  new Splide('.header__topline-container', {
    pagination: false,
    arrows: false,
    autoWidth: true,
    gap: '50px',
    breakpoints: {
      720: {
        gap: 15,
      }
    }
  }).mount();

// main slider

if (document.querySelector('.hero__slider')) {
    new Splide('.hero__slider', {
      arrows: false,
      autoplay: true,
    }).mount();
}

// models slider

if (document.querySelector('.models__slider')) {
    new Splide('.models__slider', {
      arrows: false,
      autoWidth: true,
      pagination: false,
       gap: 10,
    }).mount();
}
  
// toprated slider

if (document.querySelector('.toprated__slider')) {
  new Splide('.toprated__slider', {
    arrows: false,
    autoWidth: true,
    pagination: true,
    perMove: 1,
    type: 'loop',
    gap: 30,
    breakpoints: {
      375: {
        gap: 30,
        autowidth: false,
        perPage: 1,
        focus: 'center',
      }
    }
  }).mount();
}

// toprated slider

if (document.querySelector('.collections__slider')) {
  new Splide('.collections__slider', {
    arrows: true,
    autoWidth: true,
    pagination: false,
    perMove: 1,
    type: 'loop',
    gap: 30,
    breakpoints: {
      1200: {
        arrows: false,
        pagination: true,
      },
    }
  }).mount();
}

// // projects slider

if (document.querySelector('.projects__slider')) {
  new Splide('.projects__slider', {
    arrows: true,
    pagination: false,
    perMove: 1,
    perPage: 3,
    gap: 30,
    type: 'loop',
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
    }
  }).mount();
}

// // feedback slider

if (document.querySelector('.feedback__slider')) {
  const feedbackSlider = new Splide('.feedback__slider', {
    arrows: false,
    pagination: false,
    perMove: 1,
    perPage: 2,
    gap: 180,
    autoplay: true,
    speed: 800,
    interval: 3000,
    type: 'loop',
    autoHeight: true,
    breakpoints: {
      1200: {
        gap: 30,
      },
      720: {
        perPage: 1,
      },
    }
  }).mount();
  
  feedbackSlider.on('move', () => {
    document.querySelectorAll('.item-feedback.expanded').forEach(item => {
      item.classList.remove('expanded');
    });
  })
}

if (document.querySelector('.sliders-block')) {
  var secondarySlider = new Splide('.bottom-carousel__slider', {
    rewind: true,
    fixedWidth: 164,
    fixedHeight: 102,
    isNavigation: true,
    gap: 25,
    focus: 'center',
    pagination: false,
    cover: true,
    arrows: false,
    breakpoints: {
      '375': {
        fixedWidth: 66,
        fixedHeight: 40,
      }
    }
  }).mount();

  // Create the main slider.
  var primarySlider = new Splide('.top-carousel__slider', {
    type: 'fade',
    heightRatio: 0.5,
    pagination: false,
    arrows: false,
    cover: true,
    breakpoints: {
      '720': {
        heightRatio: 0.5,
      }
    }
  });

  // Set the thumbnails slider as a sync target and then call mount.
  primarySlider.sync(secondarySlider).mount();
}

if (document.querySelector('.similar__wrapper')) {
  new Splide('.similar__wrapper', {
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
    }
  }).mount()
}

if (document.querySelector('.collections-block__wrapper')) {
  new Splide('.collections-block__wrapper', {
    perPage: 4,
    gap: 30,
    arrows: true,
    pagination: false,
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
    }
  }).mount()
}