form = document.querySelector("form");
let usernameIsValid = false;
let passwordIsValid = false;

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
    else if (tag.type === "password") {
        passwordIsValid = true
    }
    removeError(tag);
  }
};

const autoValidate = (tag) => {
  tag.addEventListener("input", (e) => {
        validateLength(e.target)
      return true;
    }
  );
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
  validateLength(password);
  autoValidate(password);

  if (usernameIsValid && passwordIsValid) {
    userData = {
      username: username.value,
      password: password.value,
    };
    
    const url = "https://faviconify-rest-api.herokuapp.com/api/login";

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

        if (data.non_field_errors) {
            errorField.classList.remove("invisible")
            errorField.innerHTML = data.non_field_errors[0]
        }
        else if (data.token) {
            localStorage.setItem("token", data.token)
            window.location.pathname = "Favicon-Gen-Team-69/pages/profile.html"
        }
      })
      .catch((error) => console.log(error));
  }
});
