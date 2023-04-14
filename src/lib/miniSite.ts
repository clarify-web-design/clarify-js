import { gsap } from 'gsap';

export const miniSite = () => {
  const slides = document.querySelectorAll('.minisite_slider-wrapper');
  const nextButtons = document.querySelectorAll('.minisite_content-item.button.next');
  const navItems = document.querySelectorAll('.minisite_header-navitem');
  const numOfSlides = document.querySelectorAll('.minisite_body-item').length;

  let currentSlide = 0;
  const slideDuration = 0.4;

  gsap.set(slides, { x: 0 });
  updateNav();

  let slideAnimation = gsap.to({}, {});

  nextButtons?.forEach((nextButton) => {
    nextButton.addEventListener('click', function () {
      animateSlides(1);
    });
  });

  navItems?.forEach((navItem, index) => {
    navItem.addEventListener('click', function () {
      jumpToSlide(index);
    });
  });

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
