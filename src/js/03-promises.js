const formEl = document.querySelector('.form');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { amount, step, delay } = event.target.elements;
  let amountValue = Number(amount.value);
  let stepValue = Number(step.value);
  let delayValue = Number(delay.value);

  for (let i = 0; i < amountValue; i += 1) {
    createPromise(i + 1, delayValue)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); //передаємо об'єкт із ключами position, delay та значеннями position, delay
      } else {
        reject({ position, delay }); //
      }
    }, delay);
  });
}
