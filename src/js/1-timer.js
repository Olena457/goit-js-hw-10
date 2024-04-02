import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const text = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

btnStart.disabled = true;
let userSelectedDates;
let timer;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        title: 'Future date',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 2000,
        color: '#da1418',
      });
    } else {
      userSelectedDates = selectedDates[0];
      btnStart.disabled = false;
      console.log(selectedDates[0]);
    }
  },
};

flatpickr(text, options);

let anotherZero = 2;
function addLeadingZero(value) {
  const stringValue = String(value);
  const formattedValue = stringValue.padStart(2, '0');
  return formattedValue;
}
if (value >= 100) {
  anotherZero = 3;
  return String(value).padStart(anotherZero, '0');
}

btnStart.addEventListener('click', () => {
  timer = setInterval(() => {
    const timeDecrease = new Date(text.value) - new Date();
    btnStart.disabled = true;
    if (timeDecrease >= 0) {
      const objectTime = convertMs(timeDecrease);
      days.textContent = addLeadingZero(objectTime.days);
      hours.textContent = addLeadingZero(objectTime.hours);
      minutes.textContent = addLeadingZero(objectTime.minutes);
      seconds.textContent = addLeadingZero(objectTime.seconds);
      timerHtml.textContent = `${addLeadingZero(
        objectTime.hours
      )}:${addLeadingZero(objectTime.minutes)}:${addLeadingZero(
        objectTime.seconds
      )}`;
    } else {
      clearInterval(timer);
      iziToast.show({
        title: 'Digital timer',
        message: 'Countdown is over',
        position: 'topRight',
        timeout: 3000,
      });
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}

// setTimeout(() => {
//   window.location.reload(true);
// }, 6000);

// function updateCurrentTime({ days, hours, minutes, seconds }) {
//   const formattedTime = `${addLeadingZero(days)}:${addLeadingZero(
//     hours
//   )}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
//   timerHtml.textContent = formattedTime;
//   if (!days && !hours && !minutes && !seconds) {
//     timerHtml.textContent = '00:00:00:00';
//   }
// }
//
