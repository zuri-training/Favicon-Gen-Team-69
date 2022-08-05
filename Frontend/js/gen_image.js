const dragArea = document.querySelector(".drag_area");
let button = document.querySelector(".button");
let input = document.querySelector("input");
let file;
button.onclick = () => {
    input.click();
};
// while browsing
input.addEventListener("change", function() {
    file = this.files[0];
    dragArea.classList.add("active")
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
    } else {
        alert("This file is not an image");
        dragArea.classList.remove("active");
    }
}