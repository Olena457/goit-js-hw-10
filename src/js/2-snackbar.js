// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector("[name='delay']");
const inputState = document.querySelector("[name='state']");
const delay = parseInt(inputDelay.value);
// const submit = document.querySelector('submit');
form.addEventlistener('submit', creatinPromise);
let resolvedDelay;
let rejectedDelay;

const creatinPromise = new Promise((resolve, reject) => {
  ev.preventDefault();
  setTimeout(() => {
    if (inputState.value === 'fulfilled') {
      resolve(delay);
    } else {
      reject(delay);
    }
  }, delay);
});

creatinPromise
  .then(_resolvedDelay => {
    iziToast.success({
      title: 'Success',
      message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
    });
  })
  .catch(_rejectedDelay => {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${rejectedDelay}ms`,
    });
  });
