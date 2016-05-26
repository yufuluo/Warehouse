import validator from "validator";

export const validateEmail = (e) => {
  e.preventDefault();
  if (!validator.isEmail(e.target.value) || !e.target.value) {
    e.target.classList.add("ui-error");
    e.target.classList.add("ui-input_state_invalid");
  } else {
    e.target.classList.remove("ui-error");
    e.target.classList.remove("ui-input_state_invalid");
  }
};

export const validateEmpty = (e) => {
  e.preventDefault();
  if (!e.target.value) {
    e.target.classList.add("ui-error");
    e.target.classList.add("ui-input_state_invalid");
  } else {
    e.target.classList.remove("ui-error");
    e.target.classList.remove("ui-input_state_invalid");
  }
};

export const validateName = (e) => {
  e.preventDefault();
  if (!validator.isAlpha(e.target.value) || !e.target.value) {
    e.target.classList.add("ui-error");
    e.target.classList.add("ui-input_state_invalid");
  } else {
    e.target.classList.remove("ui-error");
    e.target.classList.remove("ui-input_state_invalid");
  }
};

export const validatePrice = (e) => {
  e.preventDefault();
  if (!validator.isNumeric(e.target.value) || !e.target.value) {
    e.target.classList.add("ui-error");
    e.target.classList.add("ui-input_state_invalid");
  } else {
    e.target.classList.remove("ui-error");
    e.target.classList.remove("ui-input_state_invalid");
  }
};

export const validateURL = (e) => {
  e.preventDefault();
  if (!validator.isURL(e.target.value) || !e.target.value) {
    e.target.classList.add("ui-error");
    e.target.classList.add("ui-input_state_invalid");
  } else {
    e.target.classList.remove("ui-error");
    e.target.classList.remove("ui-input_state_invalid");
  }
};

export default {
  validateEmail,
  validateEmpty,
  validateName,
  validatePrice,
  validateURL
};
