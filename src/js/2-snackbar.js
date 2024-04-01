// import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('createForm');
const delay = parseInt(document.getElementById('delay').value);
const state = document.querySelector('input[name="state"]:checked');
form.addEventListener('submit', createPromise);

function createPromise(e) {
  e.preventDefault();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        title: 'Fulfilled promise',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
        color: 'green',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: 'Rejected promise',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
        color: 'red',
      });
    });
  form.reset();
}
