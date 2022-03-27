function toggleText() {
  const text = document.querySelector('#text');
  const btn = document.querySelector('.toggle-text-button');

  btn.addEventListener('click', () => {
    if (text.hasAttribute('hidden')) {
      text.removeAttribute('hidden');
    } else {
      text.hidden = true;
    }
  })
}
