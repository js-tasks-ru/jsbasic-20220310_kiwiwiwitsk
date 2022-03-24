function initCarousel() {
  // Переменные для окна карусели, правой и левой стрелки
  const carouselWindow = document.querySelector('.carousel__inner');
  const rightArrow = document.querySelector('.carousel__arrow_right');
  const leftArrow = document.querySelector('.carousel__arrow_left');
  //Переменные для ширины слайда, количества слайдов и значения transform: translateX()
  let slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  let slideQuantity = document.querySelectorAll('.carousel__slide').length;
  let slideTranslate = 0;

  // В изначальном положении прокрутка влево недоступна
  leftArrow.style.display = 'none';

  rightArrow.addEventListener('click', () => {
    // При клике на правую стрелку - левая всегда должна быть доступна
    leftArrow.style.display = '';

    // К переменной slideTranslate добавляется ширина слайда. 
    slideTranslate += slideWidth;

    // Обновляется значение transform: translateX() окна карусели из переменной slideTranslate 
    carouselWindow.style.transform = `translateX(-${slideTranslate}px)`

    // Правая стрелка недоступна в случае, если достигнут последний слайд
    if (slideTranslate === slideWidth * (slideQuantity - 1)) {
      rightArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
    }
  })

  leftArrow.addEventListener('click', () => {
    rightArrow.style.display = '';

    // Значение slideTranslate уменьшается на ширину слайда
    slideTranslate -= slideWidth;
    carouselWindow.style.transform = `translateX(-${slideTranslate}px)`

    // Левая стрелка недоступна при достижении первого слайда
    if (slideTranslate === 0) {
      leftArrow.style.display = 'none';
    } else {
      leftArrow.style.display = '';
    }
  })
}
