import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  elem = null;

  constructor(categories) {
    this.categories = categories;

    this.elem = createElement(`
    <!--Корневой элемент RibbonMenu-->
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
    
        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
        ${this.categories.map((item) => `<a href="#" class="ribbon__item" data-id=${item.id}>${item.name}</a>`).join('')}
        </nav>
    
        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.inner = this.elem.querySelector('.ribbon__inner');
    this.leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    this.rightArrow = this.elem.querySelector('.ribbon__arrow_right');

    this.activeItem = this.elem.querySelector('.ribbon__item');
    this.activeItem.classList.add('ribbon__item_active');

    this.setEventListeners();
    this.setActiveItem();

  }

  setEventListeners() {
    this.leftArrow.addEventListener('click', () => {
      this.inner.scrollBy(-350, 0);
    })

    this.rightArrow.addEventListener('click', () => {
      this.inner.scrollBy(350, 0);
    })

    this.inner.addEventListener('scroll', () => {
      const scrollLeft = this.inner.scrollLeft;
      const scrollWidth = this.inner.scrollWidth;
      const clientWidth = this.inner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        this.leftArrow.classList.remove('ribbon__arrow_visible');
      } else if (scrollRight < 1) {
        this.rightArrow.classList.remove('ribbon__arrow_visible');
        this.leftArrow.classList.add('ribbon__arrow_visible');
      } else {
        this.leftArrow.classList.add('ribbon__arrow_visible');
        this.rightArrow.classList.add('ribbon__arrow_visible');
      }
    })
  }

  setActiveItem() {
    const menuItems = this.inner.querySelectorAll('.ribbon__item');

    for (const item of menuItems) {
      item.addEventListener('click', (e) => {
        this.activeItem.classList.remove('ribbon__item_active');
        this.activeItem = e.target;
        this.activeItem.classList.add('ribbon__item_active');

        const customEvent = new CustomEvent('ribbon-select', {
          detail: this.activeItem.dataset.id,
          bubbles: true
        })
        item.dispatchEvent(customEvent);
      })
    }
  }
}