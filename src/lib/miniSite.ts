import { gsap } from 'gsap';

export const miniSite = () => {
  const slides = document.querySelectorAll('.minisite_slider-wrapper');
  const nextButtons = document.querySelectorAll('.minisite_slide-button.next');
  const navItems = document.querySelectorAll('.minisite_header-navitem');
  const numOfSlides = document.querySelectorAll('.minisite_body-item').length;
  const colorModeSwitch = document.querySelector('.color-mode-toggle');
  const miniSiteWebpage = document.querySelector('.home_hero-webpage');
  const allSlideText = document.querySelectorAll('.minisite_content-item');

  let currentSlide = 0;
  const slideDuration = 0.4;
  const DARK_MODE_CLASS = 'is-dark';

  gsap.set(slides, { x: 0 });
  updateNav();

  let slideAnimation = gsap.to({}, {});

  nextButtons?.forEach((nextButton) => {
    nextButton.addEventListener('click', function (e) {
      e.preventDefault();
      animateSlides(1);
    });
  });

  navItems?.forEach((navItem, index) => {
    navItem.addEventListener('click', function () {
      jumpToSlide(index);
    });
  });

  colorModeSwitch?.addEventListener('click', function () {
    toggleDarkMode();
  });

  function toggleDarkMode() {
    const toggleDot = colorModeSwitch?.children[0];

    if (toggleDot?.classList.contains(DARK_MODE_CLASS)) {
      miniSiteWebpage?.classList.remove(DARK_MODE_CLASS);
      navItems.forEach((item) => {
        item.classList.remove(DARK_MODE_CLASS);
      });
      allSlideText.forEach((item) => {
        item.classList.remove(DARK_MODE_CLASS);
      });
      toggleDot.classList.remove(DARK_MODE_CLASS);
    } else {
      miniSiteWebpage?.classList.add(DARK_MODE_CLASS);
      navItems.forEach((item) => {
        item.classList.add(DARK_MODE_CLASS);
      });
      allSlideText.forEach((item) => {
        item.classList.add(DARK_MODE_CLASS);
      });
      toggleDot?.classList.add(DARK_MODE_CLASS);
    }
  }

  function jumpToSlide(slideNumber: number) {
    if (slideNumber < 0 || slideNumber + 1 > numOfSlides) {
      return;
    }

    doAnimation(slideNumber);
  }

  function animateSlides(direction: number) {
    if ((currentSlide === 0 && direction === -1) || currentSlide + 1 === numOfSlides) {
      return;
    }

    doAnimation(currentSlide + direction);
  }

  function doAnimation(newSlide: number) {
    slideAnimation.kill();
    currentSlide = newSlide;

    updateNav(newSlide);
    slideAnimation = gsap.to(slides, {
      x: `${newSlide * -100}%`,
      duration: slideDuration,
      ease: 'expo.inOut',
    });
  }

  function updateNav(slide = 0) {
    for (let i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove('current-slide');
    }
    navItems[slide].classList.add('current-slide');
  }
};
