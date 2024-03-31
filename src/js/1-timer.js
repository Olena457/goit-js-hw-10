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
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.info('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      userSelectedDate = selectedDates[0];
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(text, options);

function addLeadingZero(value) {
  const stringValue = String(value);
  const formattedValue = stringValue.padStart(2, '0');
  return formattedValue;
}
let timer;
// let timeDecrease;
let objectTime;

btnStart.addEventListener('click', () => {
  timer = setInterval(() => {
    const timeDecrease = userSelectedDate - new Date();
    btnStart.disabled = true;
    if (timeDecrease >= 0) {
      objectTime = convertMs(timeDecrease);
      days.textContent = addLeadingZero(objectTime.days);
      hours.textContent = addLeadingZero(objectTime.hours);
      minutes.textContent = addLeadingZero(objectTime.minutes);
      seconds.textContent = addLeadingZero(objectTime.seconds);
      if (!timer) {
        iziToast.info('Countdown is over');
        clearInterval(timer);
        timerHtml.style.display = 'none';
      }
    }
  }, 1000);
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
