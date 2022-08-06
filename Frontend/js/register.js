const myForm = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.getElementById("email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const button = document.querySelector("#button");

let usernameIsValid = false;
let emailIsValid = false;
let passwordIsValid = false;

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

// function setErrorFor(input, message) {
//     const fields = input.parentElement;
//     console.log(fields)
//     const small  = document.querySelector('small');
//     console.log(small);

//     // add error message inside the small tag
//     small.innerText = message;
//     fields.className = 'fields error';
// }
// function setSuccessFor(input) {
//     const fields = input.parentElement;
//     fields.className = 'fields success';
// }

function setErrorFor1(input, message) {
  const fields1 = input.parentElement;
  const small1 = document.querySelector("#small1");

  // add error message inside the small tag
  small1.innerText = message;
  fields1.className = "fields error";
}
function setSuccessFor1(input) {
  const fields1 = input.parentElement;
  fields1.className = "fields success";
}

function setErrorFor2(input, message) {
  const fields2 = input.parentElement;
  const small2 = document.querySelector("#small2");
  // add error message inside the small tag
  small2.innerText = message;
  fields2.className = "fields error";
}
function setSuccessFor2(input) {
  const fields2 = input.parentElement;
  fields2.className = "fields success";
}

function setErrorFor3(input, message) {
  const fields3 = input.parentElement;
  const small3 = document.querySelector("#small3");

  // add error message inside the small tag
  small3.innerText = message;
  fields3.className = "fields error";
}
function setSuccessFor3(input) {
  const fields3 = input.parentElement;
  fields3.className = "fields success";
}

function setErrorFor4(input, message) {
  const fields4 = input.parentElement;
  const small4 = document.querySelector("#small4");

  // add error message inside the small tag
  small4.innerText = message;
  fields4.className = "fields error";
}
function setSuccessFor4(input) {
  const fields4 = input.parentElement;
  fields4.className = "fields success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function validateInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    setErrorFor1(username, "username cannot be blank");
    usernameIsValid = false;
  } else {
    setSuccessFor1(username);
    usernameIsValid = true;
  }

  if (emailValue === "") {
    setErrorFor2(email, "email cannot be blank");
    emailIsValid = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor2(email, "email is not valid"); //'email must contain any of the special charcters and numbers'*/
    emailIsValid = false;
  } else {
    setSuccessFor2(email);
    emailIsValid = true;
  }

  if (passwordValue === "") {
    setErrorFor3(password, "password cannot be blank");
  } else if (passwordValue < 8) {
    setErrorFor3(password, "password is too short");
  } else {
    setSuccessFor3(password);
    // return true;
  }

  if (password2Value === "") {
    setErrorFor4(password2, "password cannot be blank");
    passwordIsValid = false;
  } else if (passwordValue !== password2Value) {
    setErrorFor4(password2, "password does not match");
    passwordIsValid = false;
  } else if (passwordValue < 8) {
    setErrorFor4(password2, "password is too short");
    passwordIsValid = false;
  } else {
    setSuccessFor4(password2);
    passwordIsValid = true;
  }

  if (usernameIsValid && emailIsValid && passwordIsValid) {
    postData();
  }
}

function postData() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const url = "https://faviconify-rest-api.herokuapp.com/api/register";
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Accept"
    },
    body: JSON.stringify({
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    })
  }
  console.log(url, headers)
  fetch(url, headers)
    .then((response) => {
        console.log(response)
      if (!response.ok) {
        throw Error("ERROR");
      }
    console.log(response.json())
    }).catch((err) => console.log(err))
}
