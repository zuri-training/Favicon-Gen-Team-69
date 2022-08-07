const url='https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD9x1uTZJYIotU_maFzogT5YjZ90xwfKnc'
const font_style = document.getElementById('font-style')
const font_variants = document.getElementById('font-variant')


const downloadbtn = document.querySelector('#downloadbtn');
const previewbtn = document.querySelector('#previewbtn');
const form = document.querySelector('#submit-form');
const text = document.getElementById('text-input')
const fontsize = document.getElementById('font-size')

const text_empty= document.getElementById('text-empty')
const font_size_empty = document.getElementById('font-size-empty')
// const font_size_empty_span = document.getElementById('font-size-empty-span')


getData();

async function getData(){
    const response = await fetch(url);
    const data= await response.json();
    let options =  data.items.map(item => `<option value=${item['family']}> ${item['family']}</option>`).join
      ('\n');
        
     font_style.innerHTML+=options
}


async function getSelect(){
    font_variants.innerHTML='<option value="Default"> Default </option>'
    d= document.getElementById('font-style').value
    const response = await fetch(url);
    const data= await response.json();

    let font_variant= data.items.filter(function(value){
        return value['family'] == d
    })
    console.log(typeof(font_variant))
    console.log("Font Variant Print")
    console.log(font_variant[0]['variants'].length)

    let loopcounter = font_variant[0]['variants'].length
    let i=0
    for(i=0 ; i<loopcounter ; i++){
        console.log(font_variant[0]['variants'].length)
        console.log(font_variant[0]['variants'])
        font_variants.innerHTML+=`<option value="${font_variant[0]['variants'][i]}"> ${font_variant[0]['variants'][i]}</option>`
        console.log("Running")
    }

}



downloadbtn.addEventListener('click', (e) => {
    
    // prevent the form from submitting
    e.preventDefault();

    // show the form values
    const formData = new FormData(form);

    // form data
    const values = [...formData.entries()];
    console.log(values);
    

    let text_message = []
    let font_size_message = []
    // let font_style_message = []
    if (text.value === '' || text.value == null) {
        text_message.push('Text Cannot Be Empty')
        
    }
    if (fontsize.value === '' || fontsize.value == null) {
        font_size_message.push("font size Cannot Be Empty")
    }
    // if (isNaN(fontsize.value)) {
    //     // font_size_message.push("font size Cannot Be Empty")
    //     // alert("only number allowed")
    //     font_size_empty_span.innerText="Only Numbers Allowed"
    // }

    if (text_message.length > 0) {
        e.preventDefault()
        // alert("Text cannot be empty")
        text_empty.innerText="Required *"
        // fname_error.innerText = fname_message.join(', ')
    }
    if (font_size_message.length > 0) {
        e.preventDefault()
        // alert("font size cannot be empty")
        // lname_error.innerText = lname_message.join(', ')
        font_size_empty.innerText="Required *"
    }
    if (text.value.length !== 0 ) {
        text_empty.innerText =''
        
    }
     if (fontsize.value.length !== 0) {
        font_size_empty.innerText =''
     }
   

});

previewbtn.addEventListener('click', (e) => {
    
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
        text_empty.innerText="Required *"
    }
    if (font_size_message.length > 0) {
        e.preventDefault()

        font_size_empty.innerText="Required *"
    }
    if (text.value.length !== 0 ) {
        text_empty.innerText =''
        
    }
     if (fontsize.value.length !== 0) {
        font_size_empty.innerText =''
     }
   

});