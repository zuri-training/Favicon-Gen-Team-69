const dragArea = document.querySelector(".drag_area");
let button = document.querySelector(".button");
let input = document.querySelector("input");
let file;
button.onclick = () => {
  input.click();
};
// while browsing
input.addEventListener("change", function () {
  file = this.files[0];
  dragArea.classList.add("active");
  uploadFile();
});
// when file is inside the drag area
dragArea.addEventListener("dragover", (event) => {
  event.preventDefault(), dragArea.classList.add("active");
});

// when file leaves the drag area
dragArea.addEventListener("dragleave", () => {
  dragArea.classList.remove("active");
});

// when the file is dropped in the drag area
dragArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];

  uploadFile();
});

function uploadFile() {
    const errorField = document.getElementById("general-error")
    errorField.classList.add("invisible")
  let fileType = file.type;
  let validExtensions = ["image/png", "image/jpeg", "image/jpg"];
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      dragArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
//   } else {
//     alert("This file is not an image");
//     dragArea.classList.remove("active");
  }
 
 else {
    setTimeout(()=>{
        validExtensions != ["image/png", "image/jpeg", "image/jpg"];
    },2000);
    errorField.classList.remove("invisible")
    // errorField.innerHTML = data.non_field_errors[0]
    dragArea.classList.remove("active");
    errorField.style.display='block';
}
}

// sending data to the backend
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(file);
  const imgFile = document.getElementById("image");
  const formData = new FormData();
  formData.append("image", file);
  formData.append("author_id", 2);
  var object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  console.log(object);
  const url = "https://faviconify-rest-api.herokuapp.com/api/favicon_generate/";

  let req = new XMLHttpRequest();
  req.open("POST", url);
  req.onload  = () => {
    const response = req.response;
    const data = JSON.parse(response)
   console.log(data)
 };
 
  req.send(formData);
// console.log(response)
  //   fetch(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     method: "POST",
  //     body: JSON.stringify(object),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.err);
});
