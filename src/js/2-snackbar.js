import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('createForm');
const stateRadioButtons = document.querySelectorAll('input[name="state"]');
const delayInput = document.getElementById('delay');

form.addEventListener('submit', createPromise);

function createPromise(e) {
  e.preventDefault();

  const selectedState = Array.from(stateRadioButtons).find(rb => rb.checked);
  const state = selectedState ? selectedState.value : 'rejected';
  const delay = parseInt(delayInput.value);

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
        message: `✅ Fulfilled promise${state} in ${delay}ms`,
        color: '#16971b',
        position: 'topRight',
        timeout: 2000,
      });
    })
    .catch(delay => {
      iziToast.show({
        title: 'Rejected promise',
        message: `❌ Rejected promise${state} in ${delay}ms`,
        position: 'topRight',
        color: '#da1418',
        timeout: 2000,
      });
    });
}
console.log('2-snackbar.js - loaded');
