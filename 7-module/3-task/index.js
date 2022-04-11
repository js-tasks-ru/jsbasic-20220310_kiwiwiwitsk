import createElement from "../../assets/lib/create-element.js"

export default class StepSlider {
  elem = null

  constructor({ steps, value = 0 }) {
    this.steps = steps
    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value slider__step-active">0</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
      ${this.setSteps().join('')}
      </div>
    </div>
    `)
    this.setEventListeners()
    this.#makeStepActive(value)
  }

  setSteps() {
    const arr = []
    for (let i = 0; i < this.steps; i++) {
      arr.push(i)
    }
    return arr.map((item) => `<span></span>`)
  }


  setEventListeners() {
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left
      let leftRelative = left / this.elem.offsetWidth
      let approximateValue = leftRelative * (this.steps - 1)
      let value = Math.round(approximateValue)
      this.#makeStepActive(value)
    })
  }

  #makeStepActive(value) {
    const currentActiveStep = this.elem.querySelector('.slider__step-active');
    currentActiveStep.classList.remove('slider__step-active')

    this.elem.querySelector('.slider__value').textContent = value
    const newActiveStep = this.elem.querySelectorAll('.slider__steps span')[value]
    newActiveStep.classList.add('slider__step-active')

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    const leftPercents = value / (this.steps - 1) * 100;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    const event = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    })
    this.elem.dispatchEvent(event)
  }
}