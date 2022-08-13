const previewbtn = document.querySelector('#previewbtn');
const modal = document.getElementById('modalpopup')

previewbtn.addEventListener('click', async (e) => {

    // prevent the form from submitting
    e.preventDefault();

    console.log("button clicked")

    // show the form values
    const formData = new FormData(form);

    // form data
    const values = [...formData.entries()];
    console.log(values);


    let text_message = []
    let font_size_message = []
    if (text.value === '' || text.value == null) {
        text_message.push('Text Cannot Be Empty')

    }
    if (fontsize.value === '' || fontsize.value == null) {
        font_size_message.push("font size Cannot Be Empty")
    }

    if (text_message.length > 0) {
        e.preventDefault()
        text_empty.innerText = "Required *"
    }
    if (font_size_message.length > 0) {
        e.preventDefault()

        font_size_empty.innerText = "Required *"
    }
    if (text.value.length !== 0) {
        text_empty.innerText = ''

    }
    if (fontsize.value.length !== 0) {
        font_size_empty.innerText = ''
    }

    //  modal.classList.add("open-popup")
    console.log(font_size_message.length)
    console.log(text_message.length)

    if (font_size_message.length == 0 && text_message.length == 0) {
        modal.classList.add("open-popup")
    }


});

function closepopup() {
    modal.classList.remove("open-popup")
}
