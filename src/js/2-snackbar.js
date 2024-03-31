// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventlistener('submit', function (ev) {
  ev.preventDefault();
  const inputDelay = doccument.querySelector("[name='delay']");
  const inputState = doccument.querySelector("[name='state']");
  const delay = parseInt(inputDelay.value);
  let resolvedDelay;
  let rejectedDelay;
  const creatinPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputState.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  creatinPromise
    .then(rejectedDelay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(rejectedDelay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
