const url = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD9x1uTZJYIotU_maFzogT5YjZ90xwfKnc'
const font_style = document.getElementById('font_style')
const font_variants = document.getElementById('font-variant')


const downloadbtn = document.querySelector('#downloadbtn');
const previewbtn = document.querySelector('#previewbtn');
const form = document.querySelector('#submit-form');
const text = document.getElementById('text')
const fontsize = document.getElementById('font_size')

const text_empty = document.getElementById('text-empty')
const font_size_empty = document.getElementById('font-size-empty')
// const font_size_empty_span = document.getElementById('font-size-empty-span')


//for modal
const modal = document.getElementById('modalpopup')
const successmodal = document.getElementById('successmodalpopup')

getData();

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    let options = data.items.map(item => `<option value=${item['family']}> ${item['family']}</option>`).join
        ('\n');

    font_style.innerHTML += options
}


async function getSelect() {
    font_variants.innerHTML = '<option value="Default"> Default </option>'
    d = document.getElementById('font_style').value
    const response = await fetch(url);
    const data = await response.json();

    let font_variant = data.items.filter(function (value) {
        return value['family'] == d
    })
    // console.log(typeof(font_variant))
    // console.log("Font Variant Print")
    // console.log(font_variant[0]['variants'].length)

    let loopcounter = font_variant[0]['variants'].length
    let i = 0
    for (i = 0; i < loopcounter; i++) {

        font_variants.innerHTML += `<option value="${font_variant[0]['variants'][i]}"> ${font_variant[0]['variants'][i]}</option>`
        // console.log("Running")
    }
    console.log(font_variant[0]['variants'].length)
    console.log(font_variant[0]['variants'])

}



downloadbtn.addEventListener('click', async (e) => {

    // prevent the form from submitting
    e.preventDefault();



    let text_message = []
    let font_size_message = []
    // let font_style_message = []
    if (text.value === '' || text.value == null) {
        text_message.push('Text Cannot Be Empty')

    }
    if (fontsize.value === '' || fontsize.value == null) {
        font_size_message.push("font size Cannot Be Empty")
    }

    if (text_message.length > 0) {
        e.preventDefault()
        // alert("Text cannot be empty")
        text_empty.innerText = "Required *"
        // fname_error.innerText = fname_message.join(', ')
    }
    if (font_size_message.length > 0) {
        e.preventDefault()
        // alert("font size cannot be empty")
        // lname_error.innerText = lname_message.join(', ')
        font_size_empty.innerText = "Required *"
    }
    if (text.value.length !== 0) {
        text_empty.innerText = ''

    }
    if (fontsize.value.length !== 0) {
        font_size_empty.innerText = ''
    }

    processoutput()
    if (font_size_message.length == 0 && text_message.length == 0) {
        successmodal.classList.add("open-popup")

    }
    //  successmodal.classList.add("open-popup")


});

previewbtn.addEventListener('click', async (e) => {

    // prevent the form from submitting
    e.preventDefault();

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


function closesuccesspopup() {
    successmodal.classList.remove("open-popup")
}

function closepopup() {
    modal.classList.remove("open-popup")
}

function processoutput() {
    // show the form values
    const formData = new FormData(form);

    // form data
    const values = [...formData.entries()];
    values[3][1] = hexToRgb(values[3][1])
    values[4][1] = hexToRgb(values[4][1])
    //  console.log(values[3][1]);
    console.log(values)
    // console.log("Output Logged")
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    // return result ? {
    //   r: parseInt(result[1], 16),
    //   g: parseInt(result[2], 16),
    //   b: parseInt(result[3], 16)
    // } : null;
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;

}