import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (!cartItem) {
      cartItem = {
        product,
        count: 1
      };
      this.cartItems.push(cartItem);
    } else {
      cartItem.count++;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(
      item => item.product.id == productId
    );

    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.count, 0
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.count, 0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();

    const modalBody = document.createElement('div');
    for (const item of this.cartItems) {
      modalBody.append(this.renderProduct(item.product, item.count));
    };
    modalBody.append(this.renderOrderForm());

    modalBody.addEventListener('click', (e) => {
      const button = e.target.closest('.cart-counter__button');
      const productId = button.closest('.cart-product').dataset.productId;

      if (button.classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(productId, 1)
      };
      if (button.classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(productId, -1)
      };
    });

    modalBody.querySelector('.cart-form').addEventListener('submit', (e) => {
      this.onSubmit(e);
    });

    this.modal.setTitle('Your order');
    this.modal.setBody(modalBody);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    };

    const productId = cartItem.product.id;
    const modalBody = document.querySelector('.modal__body');
    const productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

    if (this.cartItems.length === 0) {
      this.modal.close();
    }
    if (cartItem.count === 0) {
      modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    document.querySelector(`[type="submit"]`).classList.add('is-loading');
    const cartForm = document.querySelector('.cart-form');
    const formData = new FormData(cartForm);
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    }).then(() => {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.modal.setBody(createElement(`
        <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
    `));
      this.cartIcon.update(this);
    })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

