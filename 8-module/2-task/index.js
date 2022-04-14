import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
  `)

    this.inner = this.elem.querySelector('.products-grid__inner')

    this.render()

  }


  render() {
    this.inner.innerHTML = '';

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) continue;

      if (this.filters.vegeterianOnly && !product.vegeterian) continue;

      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) continue;

      if (this.filters.category && product.category != this.filters.category) continue;

      this.inner.append(new ProductCard(product).elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.render();
  }
}