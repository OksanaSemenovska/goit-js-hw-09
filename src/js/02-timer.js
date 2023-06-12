import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const body = document.querySelector(' body');
const inputWrap = document.querySelector('.input-wrap');

const timer = document.querySelector('.timer');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[ data-seconds]');
const start = document.querySelector('[ data-start]');
let timerId = null;
let deltaTime =null
start.addEventListener('click', countLeftTime);
let targetDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0].getTime();
  
  },
  onChange(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime() ) {
      Notify.failure('Please, pick  the date in the future',
        {
        width: '620px', 
        borderRadius: '10px',
        position: 'center-top',
      })
    }
   
  }
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero((Math.floor(ms / day)));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTextContent(time) {
  days.textContent = time.days;
  hours.textContent = time.hours;
  min.textContent = time.minutes;
  sec.textContent = time.seconds;
}

function countLeftTime() {
  body.style.backgroundColor = 'bisque';
  timer.style.visibility = 'visible';
  inputWrap.innerHTML = '';

     timerId = setInterval(() => {

    const currentDate = Date.now();
   
     deltaTime = targetDate - currentDate;
     if (deltaTime < 0) {
    
      timer.innerHTML = " TIME EXPIRED";
      clearInterval( timerId)
      return 
    }
    const countTime = convertMs(deltaTime);
   
    updateTextContent(countTime);
  }, 1000);
}
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
 }