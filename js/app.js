document.addEventListener('DOMContentLoaded', function () {

  // Функция дропдауна
  function headerDropDown() {
    document.querySelectorAll('.header__dropdown-item').forEach(function (dropDownItem) {
      const dropDownBtn = dropDownItem.querySelector('.header__dropdown-btn');
      const dropDownMenu = dropDownItem.querySelector('.dropdown__menu');
      const dropDownMenuItem = dropDownMenu.querySelectorAll('.dropdown__menu-item');

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
  function customScroll () {
    document.querySelectorAll('.dropdown__menu').forEach(function(el) {
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

  headerDropDown();
  customScroll();
  headerSearch();
  sliderIntro();
  outlineBtn();
});