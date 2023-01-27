import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name=email]'),
  message: document.querySelector('[name=message]'),
  btn: document.querySelector('[type="submit"]'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

let formData = {};

refs.form.addEventListener('input', throttle(saveData, 500));

function saveData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  console.log(formData);
  formData = {};
  localStorage.removeItem(LOCALSTORAGE_KEY);
  e.target.reset();
}
