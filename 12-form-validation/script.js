const form = document.getElementById("form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;
let isPasswordMatched = false;

// name attribute is given for each form inputs . where key is the name attribute given to input.
function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    password: form.password.value,
    confirmPassword: form.confirmPassword.value,
    url: form.url.value,
  };
  window.localStorage.setItem("user", JSON.stringify(user));
}

function valdateForm() {
  // using constraint api. this will return true if all input in form are valid else will return false
  isValid = form.checkValidity();
  if (!isValid) {
    message.textContent = "Please Fill Out All The Fields!";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    return;
  }
  if (password.value === confirmPassword.value) {
    isPasswordMatched = true;
    password.style.borderColor = "green";
    confirmPassword.style.borderColor = "green";
  } else {
    isPasswordMatched = "false";
    message.textContent = "Make sure password match.";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    password.style.borderColor = "red";
    confirmPassword.style.borderColor = "red";
  }
  if (isValid && isPasswordMatched) {
    message.textContent = "Successfully Registered";
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
    storeFormData();
  }
}

function processFormData(e) {
  e.preventDefault();
  valdateForm();
}

function getDataFromLocalStorage() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (user) {
    form.name.value = user.name;
    form.phone.value = user.phone;
    form.email.value = user.email;
    form.password.value = user.password;
    form.confirmPassword.value = user.confirmPassword;
    form.url.value = user.url;
  }
}

form.addEventListener("submit", processFormData);
getDataFromLocalStorage();
