form = document.querySelector("form");
let usernameIsValid = false;
let passwordIsValid = false;
let emailIsValid = false;

let valid = 0;

const addError = (tag) => {
  errorParagraph = tag.nextElementSibling;
  tag.classList.add("invalid");
  errorParagraph.classList.remove("invisible");
};

const removeError = (tag) => {
  errorParagraph = tag.nextElementSibling;
  tag.classList.remove("invalid");
  errorParagraph.classList.add("invisible");
};

const validateLength = (tag) => {
  if (tag.value.length < 4) {
    addError(tag);
  } else {
    if (tag.type === "text") {
      usernameIsValid = true;
    }
    removeError(tag);
  }
};

const validateEmail = (tag) => {
  if (!tag.value.includes("@")) {
    addError(tag);
  } else {
    removeError(tag);
    emailIsValid = true;
  }
};

const validatePassword = (password, cPassword) => {
  if (password.value !== cPassword.value || password.value.length < 1) {
    addError(cPassword);
  } else {
    removeError(cPassword);
    passwordIsValid = true;
  }
};

const autoValidate = (tag, second = "") => {
  tag.addEventListener("input", (e) => {
    if (e.target.type == "email") {
      validateEmail(e.target);
      return false;
    } else if (e.target.name == "cpassword") {
      validatePassword(second, e.target);
    } else {
      validateLength(e.target);
      return true;
    }
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  username = e.target.username;
  email = e.target.email;
  password = e.target.password;
  cpassword = e.target.cpassword;

  errorField = document.querySelector("#general-error")
  errorField.classList.add("invisible")

  validateLength(username);
  autoValidate(username);
  validateEmail(email);
  autoValidate(email);
  autoValidate(email);
  validateLength(password);
  autoValidate(password);
  validatePassword(password, cpassword);
  autoValidate(cpassword, password);

  if ((usernameIsValid, passwordIsValid, emailIsValid)) {
    userData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    const url = "https://faviconify-rest-api.herokuapp.com/api/register";

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)

        if (data.username) {
            errorField.classList.remove("invisible")
            errorField.innerHTML = data.username[0]
        }
        else if (data.user) {
            // console.log("successful")
            window.location.pathname = "pages/login.html"
        }
      })
      .catch((error) => console.log(error));
  }
});
