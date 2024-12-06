import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const timeFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

let userSelectedDate;
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({ title: "Error", message: "Please choose a date in the future" });
      startBtn.disabled = true;
      return;
    }
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr(dateTimePicker, options);

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startCountDown();
  dateTimePicker.disabled = true;
  startBtn.disabled = true;
});

function startCountDown() {
  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = userSelectedDate - currentTime;

    if (timeDiff <= 0) {
      clearInterval(countdownInterval);
      dateTimePicker.disabled = false;
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({ title: "Complete", message: "Countdown finished!" });
      return;
    }
    const time = convertMs(timeDiff);
    updateTimerUI(time);
  }, 1000);
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerUI({ days, hours, minutes, seconds }) {
  timeFields.days.textContent = addLeadingZero(days);
  timeFields.hours.textContent = addLeadingZero(hours);
  timeFields.minutes.textContent = addLeadingZero(minutes);
  timeFields.seconds.textContent = addLeadingZero(seconds);
}
