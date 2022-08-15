const redirect = window.localStorage.getItem("redirect")

form = document.querySelector("form");

redirectError = document.querySelector("#redirect-error")
errorField = document.querySelector("#general-error")

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

if (redirect === "initial") {
  redirectError.classList.remove("invisible")
  redirectError.innerHTML = "You must login to access this page"
  setTimeout(() => {
    redirectError.classList.add("invisible")
    window.localStorage.removeItem("login_redirect")
  }, 7000)

}

if (redirect === "initial") {
  redirectError.classList.remove("invisible")
  redirectError.innerHTML = "Please login to continue"
  setTimeout(() => {
    redirectError.classList.add("invisible")
    window.localStorage.removeItem("redirect")
  }, 7000)

}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  username = e.target.username;
  email = e.target.email;
  password = e.target.password;
  cpassword = e.target.cpassword;

  validateLength(username);
  autoValidate(username);
  validateLength(password);
  autoValidate(password);

  if (usernameIsValid && passwordIsValid) {
    userData = {
      username: username.value,
      password: password.value,
    };
    
    const url = "https://faviconify-rest-api.herokuapp.com/api/login/";
    
    const login = document.querySelector("#login")
    const spinner = document.querySelector("#ispinner")
    login.classList.add("invisible")
    spinner.classList.remove("invisible")


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
            login.classList.remove("invisible")
            spinner.classList.add("invisible")
        }
        else if (data.token) {
            const token_info = JSON.stringify({...data})
            // window.localStorage.removeItem("token_info")
            window.localStorage.setItem("token_info",token_info)
            window.location.pathname = "/Favicon-Gen-Team-69/pages/profile.html"
        }
      })
      .catch((error) => console.log(error));
  }
});
