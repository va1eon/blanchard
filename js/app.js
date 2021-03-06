document.addEventListener('DOMContentLoaded', function () {
  // Функция дропдауна
  function headerDropDown() {
    document.querySelectorAll('.header__dropdown-item').forEach(function (dropDownItem) {
      const dropDownBtn = dropDownItem.querySelector('.header__dropdown-btn');
      const dropDownMenu = dropDownItem.querySelector('.dropdown__menu');
      // const dropDownMenuItem = dropDownMenu.querySelectorAll('.dropdown__menu-item');

      dropDownBtn.addEventListener('click', function () {
        dropDownMenu.classList.toggle('dropdown__menu--visible');
        this.classList.toggle('header__dropdown-btn--active');
      });

      document.addEventListener('click', function (e) {
        if (e.target !== dropDownBtn) {
          dropDownMenu.classList.remove('dropdown__menu--visible');
          dropDownBtn.classList.remove('header__dropdown-btn--active');
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Tab') {
          dropDownMenu.classList.remove('dropdown__menu--visible');
          dropDownBtn.classList.remove('header__dropdown-btn--active');
          dropDownBtn.blur();
        }
      });
    });
  }

  // Библиоткеа simplebar
  function customScroll() {
    document.querySelectorAll('.dropdown__menu').forEach(function (el) {
      new SimpleBar(el), {
        autoHide: false,
        scrollbarMaxSize: 70
      }
    });
  }

  // функция для стилизация поиска
  function headerSearch() {
    const searchInput = document.querySelector('.header__search-input');
    const searchButton = document.querySelector('.header__search-btn');
    searchInput.addEventListener('input', function () {
      this.classList.add('header__search-input--nonfocus');
      searchButton.style.fill = 'var(--purple-light)';
      if (this.value === '') {
        this.classList.remove('header__search-input--nonfocus');
        searchButton.style.fill = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchButton.style.fill = '';
        searchInput.classList.remove('header__search-input--nonfocus');
        searchInput.blur();
      }
    });

    document.addEventListener('click', function (e) {
      if (e.target !== searchInput) {
        searchButton.style.fill = '';
        searchInput.classList.remove('header__search-input--nonfocus');
      }
    });
  }

  // Swiper
  function sliderIntro() {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      effect: 'fade',
      speed: 1500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  // Кастомный outline для кнопок
  function outlineBtn() {
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.parentNode.style.borderColor = '';
      });

      btn.addEventListener('focus', function () {
        this.parentNode.style.borderColor = 'var(--purple-light)';
      });
      btn.addEventListener('blur', function () {
        this.parentNode.style.borderColor = '';
      });
    });
  }

  //функция перемещения строки поиска
  function searchForm() {
    const headerSearh = document.querySelector('.header__search');
    const searchBtn = document.querySelector('.header__search-btn');
    const searchInput = document.querySelector('.header__search-input');

    searchBtn.addEventListener('click', function () {
      if (document.body.offsetWidth <= 1229) {
        searchInput.classList.toggle('header__search-input--active')
        headerSearh.classList.toggle('header__search--active');
        this.classList.toggle('header__search-btn--active');
        if (searchInput.classList.contains('header__search-input--active')) {
          searchInput.removeAttribute('placeholder');
        }
      }
    });
  }

  // Функция кнопки закрыть для поиска
  function creatCloseBtn() {
    const closeBtn = document.createElement('button');
    const headerSearh = document.querySelector('.header__search');
    const searchBtn = document.querySelector('.header__search-btn');
    const searchInput = document.querySelector('.header__search-input');

    closeBtn.setAttribute('type', 'button');
    closeBtn.classList.add('search__close');
    headerSearh.append(closeBtn);

    closeBtn.addEventListener('click', function () {
      searchInput.classList.remove('header__search-input--active')
      headerSearh.classList.remove('header__search--active');
      searchBtn.classList.remove('header__search-btn--active');
      this.classList.remove('search__close--active')
    });
  }

  // Функция создания бургер меню
  function createBurger() {
    const burger = document.createElement('button');
    const burgerIcon = document.createElement('span');

    burger.classList.add('burger');
    burger.id = 'burger';

    burgerIcon.classList.add('burger__icon');
    burger.append(burgerIcon);

    document.querySelector('.header__inner--top').prepend(burger);

    clickBurger();
  }

  // Функция клика по бургеру
  function clickBurger() {
    const burger = document.getElementById('burger');

    burger.addEventListener('click', function () {
      this.classList.toggle('burger--active');
      document.querySelector('.header__top').classList.toggle('header__top--active');
      document.querySelector('.nav').classList.toggle('nav--active');
    })
  }

  // Функция копирования кнопки логин
  function loginBtn() {
    const navBar = document.querySelector('.nav');
    const headerLogin = document.querySelector('.header__login-link');
    const cloneLogin = headerLogin.cloneNode(true);
    navBar.append(cloneLogin);
    cloneLogin.classList.add('btn');
    cloneLogin.classList.add('header__login-clone');
  }

  headerDropDown();
  customScroll();
  headerSearch();
  sliderIntro();
  outlineBtn();

  // Функиця наблюдение за изменением ширины монитора
  const ro = new ResizeObserver(entries => {
    for (let entry of entries) {
      const cr = entry.contentRect;

      if (cr.width <= 1229) {
        if (!document.querySelector('.burger')) {
          createBurger();
          searchForm();
        }
        if (!document.querySelector('.header__login-link').classList.contains('btn')) {
          loginBtn();
        }
      }

      if (cr.width > 1229) {
        if (document.querySelector('.burger')) {
          document.querySelector('.burger').remove()
        }

        if (document.querySelector('.header__login-link').classList.contains('btn')) {
          document.querySelector('.header__login-link').classList.remove('btn');
        }

        if (document.querySelector('.header__login-clone')) {
          document.querySelector('.header__login-clone').remove();
        }

        if (!document.querySelector('.header__search-input').classList.contains('header__search-input--active')) {
          document.querySelector('.header__search-input').setAttribute('placeholder', 'Поиск по сайту');
        }
      }

      if (cr.width < 992) {
        if (!document.querySelector('.search__close')) {
          creatCloseBtn()
          document.querySelector('.header__search-btn').addEventListener('click', function () {
            document.querySelector('.search__close').classList.toggle('search__close--active');
          });
        }
      }

      if (cr.width > 991) {
        if (document.querySelector('.search__close')) {
          document.querySelector('.search__close').remove();
        }
      }
    }
  });

  ro.observe(document.body)

  const da = new DynamicAdapt("max");
  da.init();
});