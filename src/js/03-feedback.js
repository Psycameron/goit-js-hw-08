import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name=email]'),
  message: document.querySelector('[name=message]'),
  btn: document.querySelector('[type="submit"]'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

populateInputs();

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', throttle(onTextInput, 500));

let formData = {};

function onTextInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onSubmit(e) {
  e.preventDefault();
  console.log(formData);
  formData = {};
  localStorage.removeItem(LOCALSTORAGE_KEY);
  e.target.reset();
}

function populateInputs() {
  const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);
  const savedMessageJSON = JSON.parse(savedMessage);

  if (savedMessage) {
    refs.email.value = savedMessageJSON.email || '';
    refs.message.value = savedMessageJSON.message || '';
  }
}
