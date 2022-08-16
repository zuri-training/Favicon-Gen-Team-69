const dragArea = document.querySelector(".drag_area");
const form = document.querySelector("form");
let button = document.querySelector(".button");
let input = document.querySelector("input");
const errorField = document.getElementById("general-error");
const cancelBtn = document.querySelector("#cancelBtn");
const uploadArea = document.querySelector(".uploadArea");

let file;
button.onclick = () => {
  input.click();
};
// while browsing
input.addEventListener("change", function () {
  cancelBtn.classList.add("invisible");
  errorField.classList.add("invisible");
  file = this.files[0];
  dragArea.classList.add("active");
  uploadFile();
});
// when file is inside the drag area
dragArea.addEventListener("dragover", (event) => {
  event.preventDefault(), cancelBtn.classList.add("invisible");
  errorField.classList.add("invisible");
  file = this.files[0];
  dragArea.classList.add("active");
  uploadFile();
});

// when file leaves the drag area
dragArea.addEventListener("dragleave", () => {
  dragArea.classList.remove("active");
  cancelBtn.classList.add("invisible");
  errorField.classList.add("invisible");
  file = this.files[0];
  dragArea.classList.add("active");
  uploadFile();
});

// when the file is dropped in the drag area
dragArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];

  uploadFile();
});

const clearImage = (e) => {
  form.reset();
  dragArea.style.backgroundImage = "none";
  uploadArea.classList.remove("invisible");
  cancelBtn.classList.add("invisible");
};

function uploadFile() {
  let fileType = file.type;
  let validExtensions = ["image/png", "image/jpeg", "image/jpg"];
  if (validExtensions.includes(fileType)) {
    cancelBtn.classList.remove("invisible");
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      // let imgTag = `<img src="${fileURL}" alt="">`;
      dragArea.style.backgroundImage = `url(${fileURL})`;
      uploadArea.classList.add("invisible");
    };
    fileReader.readAsDataURL(file);
  } else {
    console.log("there was an error");
    console.log(errorField);
    errorField.classList.remove("invisible");
    errorField.innerHTML = "Please upload only .png, .jpg and .jpeg files";
    dragArea.classList.remove("active");
  }
}

// sending data to the backend
form.addEventListener("submit", (event) => {
  event.preventDefault();
  my_file = event.target.image.files[0];
  if (file === undefined) {
    errorField.classList.remove("invisible");
    errorField.innerHTML = "Please upload an image first";
    setTimeout(() => {
      errorField.classList.add("invisible");
    }, 2000);
    return;
  }

  const spinner = document.querySelector("#ispinner")
  generateBtn.classList.add("invisible")
  previewbtn.classList.add("invisible")
  spinner.classList.remove("invisible")
  
  const formData = new FormData(event.target);
  formData.append("type", "image");
  formData.append("author_id", 3);

  const url = "https://faviconify-rest-api.herokuapp.com/api/generate_favicon/";
  const token_info = window.localStorage.getItem("token_info");
  const token = JSON.parse(token_info).token;
  fetch(url, {
    headers: {
      "Authorization": `Token ${token}`,
    },
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    }).then((data) => {
      favicon_data = data
      downloadBtn.setAttribute("href", favicon_data.zip_file)
      myIconList = favicon_data.icons
      myIconList.forEach(element => {
        iconsList.insertAdjacentHTML("beforeend", `<li>
        <div class="success-modal-row5-container-links">
          <span>&ltlink rel="icon" type="image/png" sizes="32x32" href="${element.icon}" /&gt</span>
          <img src="../images/copy.svg" alt="">
        </div>
      </li>`)
      });
      generateBtn.classList.remove("invisible")
      previewbtn.classList.remove("invisible")
      spinner.classList.add("invisible")
      successmodal.classList.add("open-popup");
    })
    .catch((error) => {
      console.log(error);
    });

});

// PREVIEW JAVASCRIPT LOGIC

const previewbtn = document.querySelector("#previewbtn");
const modal = document.getElementById("modalpopup");
const successmodal = document.getElementById("successmodalpopup");
const iconsList = document.querySelector("#iconsList")
// MODAL IMAGES
const modal_imgs = document.querySelectorAll(".modal-logo");
const generateBtn = document.querySelector("#generateBtn");
const downloadBtn = document.querySelector("#downloadBtn")

previewbtn.addEventListener("click", async (e) => {
  // prevent the form from submitting
  e.preventDefault();

  console.log("button clicked");

  // check if image is uploaded
  if (file === undefined) {
    errorField.classList.remove("invisible");
    errorField.innerHTML = "Please upload an image first";
    setTimeout(() => {
      errorField.classList.add("invisible");
    }, 2000);
    return;
  }

  console.log(file);
  modal_imgs.forEach((modal) => {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      modal.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  });
  modal.classList.add("open-popup");
  // //  modal.classList.add("open-popup")
  // console.log(font_size_message.length)
  // console.log(text_message.length)

  // if (font_size_message.length == 0 && text_message.length == 0) {
  //     modal.classList.add("open-popup")
  // }
});

function closepopup() {
  modal.classList.remove("open-popup");
}

function closesuccesspopup() {
  successmodal.classList.remove("open-popup");
  window.location.pathname = "/Favicon-Gen-Team-69/pages/profile.html"
}
