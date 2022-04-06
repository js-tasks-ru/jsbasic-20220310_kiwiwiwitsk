import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  carousel = null;
  slideTransition = 0;

  constructor(slides) {
    this.slides = slides;
    // Создаем карусель
    this.carousel = createElement(`
    <div class="carousel">
		  <div class="carousel__arrow carousel__arrow_right">
		    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
		  </div>
		  <div class="carousel__arrow carousel__arrow_left">
		    <img srcgit ="/assets/images/icons/angle-left-icon.svg" alt="icon">
		  </div>
		  <div class="carousel__inner">
		  </div>
	  </div>
    `)
    // Получаем кнопки и carousel__inner
    this.leftArrow = this.carousel.querySelector('.carousel__arrow_left')
    this.rightArrow = this.carousel.querySelector('.carousel__arrow_right')

    this.inner = this.carousel.querySelector('.carousel__inner')

    // Заполняем inner слайдами
    for (let slide of this.slides) {
      this.inner.innerHTML += `
     <div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
     `
    }

    // Получаем кол-во слайдрв и вызываем функции перемотки карусели и userEvent
    this.slideQuantity = this.inner.querySelectorAll('.carousel__slide').length;
    this.slideRight()
    this.slideLeft()
    this.productAdd();
  }

  get elem() {
    return this.carousel;
  }

  hideArrow() {
    // Функция убирает стрелки при достижении максимальной и минимальной перемотки
    if (this.slideTransition === 0) {
      this.leftArrow.style.display = 'none'
      this.rightArrow.style.display = ''
    } else {
      this.leftArrow.style.display = ''
    }
    if (this.slideTransition === this.inner.offsetWidth * (this.slideQuantity - 1)) {
      this.rightArrow.style.display = 'none'
    } else {
      this.rightArrow.style.display = ''
    }
  }
  // Функции slide изменяют transform иннера при клике на кнопки
  slideRight() {
    this.hideArrow()
    this.rightArrow.addEventListener('click', () => {
      this.slideTransition += this.inner.offsetWidth;
      this.inner.style.transform = `translateX(-${this.slideTransition}px)`
      this.hideArrow()
    })
  }
  slideLeft() {
    this.hideArrow()
    this.leftArrow.addEventListener('click', () => {
      this.slideTransition -= this.inner.offsetWidth;
      this.inner.style.transform = `translateX(-${this.slideTransition}px)`
      this.hideArrow()
    })
  }
  // Получаем все кнопки карусели и назначаем userEvent при клике 
  productAdd() {
    const buttons = this.carousel.querySelectorAll('.carousel__button');
    for (const button of buttons) {
      button.addEventListener('click', () => {
        const e = new CustomEvent("product-add", {
          detail: button.parentNode.parentNode.dataset.id,
          bubbles: true
        });
        this.carousel.dispatchEvent(e);
      })
    }
  }
}
