export default function promiseClick(button) {
  let myPromise = new Promise((resolve) => {
    button.addEventListener('click', (e) => {
      resolve(e);
    }, true);
  });
  return myPromise;
}
