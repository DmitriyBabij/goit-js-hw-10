import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

  const delay = parseInt(this.querySelector('[name="delay"]').value, 10);
  const state = this.querySelector('[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

    promise.then(
    (result) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${result}ms`,
      });
    
    },
    (result) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${result}ms`,
      });
    }
    ); 

    form.reset();
})

