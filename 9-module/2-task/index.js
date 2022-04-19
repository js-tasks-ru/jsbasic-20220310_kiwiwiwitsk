import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(carousel.elem);

    let ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);

    let stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').append(stepSlider.elem);

    let cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    let promise = new Promise ((resolve) => {
      fetch('products.json')
        .then(response => resolve(response.json()))
    });
    let result = await promise;

    let productsGrid = new ProductsGrid(result);
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    let isLoading = document.querySelector('.is-loading');

    productsGridHolder.removeChild(isLoading);
    productsGridHolder.append(productsGrid.elem);
    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.stepNum
    });

    let body = document.querySelector('body');

    body.addEventListener('product-add', (event) => {
      cart.addProduct(result.find(item => item.id === event.detail));
    });
    body.addEventListener('slider-change', (event) => {
      productsGrid.updateFilter({maxSpiciness: event.detail});
    });
    body.addEventListener('ribbon-select', (event) => {
      productsGrid.updateFilter({category: event.detail});
    });

    document.getElementById('nuts-checkbox').addEventListener('change', () => {
      productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked
      });
    });
    document.getElementById('vegeterian-checkbox').addEventListener('change', () => {
      productsGrid.updateFilter({
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked
      });
    });

    return promise;
  }
}
