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
    try {
        const response = await fetch(url);
        const data = await response.json();
        let options = data.items.map(item => `<option value=${item['family']}> ${item['family']}</option>`).join
            ('\n');

        font_style.innerHTML += options
    } catch (err) {
        // catches errors both in fetch and response.json
        alert(err);
    }
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
    // console.log(font_variant)
    let loopcounter = font_variant[0]['variants'].length
    let i = 0
    for (i = 0; i < loopcounter; i++) {

        font_variants.innerHTML += `<option value="${font_variant[0]['variants'][i]}"> ${font_variant[0]['variants'][i]}</option>`
        // console.log("Running")
    }
    console.log(font_variant[0]['variants'].length)
    console.log(font_variant[0]['variants'])

    //     catch(err) {
    //         // catches errors both in fetch and response.json
    //         alert(err);
    //       }
}

// var font_url="";
// async function getUrl(){


//     const response = await fetch(url);
//     const data = await response.json();
//     let tryurl = data.items.filter(function (value) {
//         return value['family'] == font_style.value
//     })
//      urlDictionary=tryurl[0]['files']

//      Object.keys(urlDictionary).forEach(key => {
//         if (key==font_variants.value){
//             font_url=urlDictionary[key]
//         }

//       });

// }



downloadbtn.addEventListener('click', async (e) => {

    // prevent the form from submitting
    e.preventDefault();

    // console.log(e)

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


    if (font_size_message.length == 0 && text_message.length == 0) {
        try {
            processoutput()
        }
        catch (err) {
            // catches errors both in fetch and response.json
            alert(err);
        }
        // if(processoutput()){
        //     successmodal.classList.add("open-popup")
        // }
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
    // console.log(font_size_message.length)
    // console.log(text_message.length)

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


var t_color = [255, 255, 255];
var b_color = [0, 0, 0];


async function processoutput() {
    // getUrl()
    try {
        //getting font url
        font_url = "http://fonts.gstatic.com/s/calistoga/v10/6NUU8F2OJg6MeR7l4e0vtMYAwdRZfw.ttf"
        const response = await fetch(url);
        const data = await response.json();
        let tryurl = data.items.filter(function (value) {
            return value['family'] == font_style.value
        })
        urlDictionary = tryurl[0]['files']

        Object.keys(urlDictionary).forEach(key => {
            if (key == font_variants.value) {
                font_url = urlDictionary[key]
            }

        });
        //
        var element1 = document.createElement("input");
        element1.type = "hidden";
        element1.value = t_color;
        element1.name = "text_color";
        document.getElementById("submit-form").appendChild(element1);

        var element2 = document.createElement("input");
        element2.type = "hidden";
        element2.value = b_color;
        element2.name = "background_color";
        document.getElementById("submit-form").appendChild(element2);

        var element3 = document.createElement("input");
        element3.type = "hidden";
        element3.value = font_url
        element3.name = "url";
        document.getElementById("submit-form").appendChild(element3);
        // getUrl()

        // show the form values
        const formData = new FormData(form);


        // form data
        const values = [...formData.entries()];
        console.log(values)
        text_value = values[0][1]
        font_size_value = values[1][1]
        font_style_value = values[2][1]
        font_variant_value = values[3][1]

        str = values[4][1].split(",")
        list = Array.from(str)
        text_color_value =[parseInt(list[0]),parseInt(list[1]),parseInt(list[2])]

        str2 = values[5][1].split(",")
        list2 = Array.from(str2)
    
        background_color_value = [parseInt(list2[0]),parseInt(list2[1]),parseInt(list2[2])]
         
        url_value = values[6][1]

        // console.log((values[4][1]).length)
        // Array.from(values[5][1]).forEach(element => {
        //     console.log(element);
        //   });

        // console.log(list)

        // console.log(background_color_value);
        // for(i=0;i<3;i++){
        //     console.log(values[5][1][i])
        //     console.log("next")
        // }
        // console.log(typeof(url_value))
        // console.log(typeof(background_color_value))

        //making api calls
        const endpointurl = "http://faviconify-rest-api.herokuapp.com/api/text_preview/";

        const token_info = window.localStorage.getItem("token_info");
        const token = JSON.parse(token_info).token;
        fetch(endpointurl, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                'text': text_value,
                'font_size': font_size_value,
                'font_style': font_style_value,
                'font-variant': font_variant_value,
                'text_color': text_color_value,
                'background_color': background_color_value,
                'url': url_value,
            })
        })
            .then(function (response) {
                console.log(response);
                if (response.ok) {
                    return response.blob();
                    console.log(response.blob())
                }
                // let blob = new Blob(
                //     [response.data], 
                //     { type: response.headers['content-type'] }
                //   )
            })
            .then(blob => {
                //  const imageObjectURL = URL.createObjectURL(blob);
                //  console.log(imageObjectURL);

                // let image = window.URL.createObjectURL(blob)
                // console.log(image)
                // favicon_data = data
                // downloadBtn.setAttribute("href", favicon_data.zip_file)
                // myIconList = favicon_data.icons
                // myIconList.forEach(element => {
                //   iconsList.insertAdjacentHTML("beforeend", `<li>
                //   <div class="success-modal-row5-container-links">
                //     <span>&ltlink rel="icon" type="image/png" sizes="32x32" href="${element.icon}" /&gt</span>
                //     <img src="../images/copy.svg" alt="">
                //   </div>
                // </li>`)
                // });
                successmodal.classList.add("open-popup")
            })
            .catch((error) => console.log(error));


        //


        // 
    }
    catch (err) {
        // catches errors both in fetch and response.json
        alert(err);
    }

    // console.log(values)


    // remove Elements added
    document.getElementById("submit-form").removeChild(element2);
    document.getElementById("submit-form").removeChild(element1);
    document.getElementById("submit-form").removeChild(element3);

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

// color picker 
// default_color='#000000'
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'monolith', // or 'monolith', or 'nano'
    // default:default_color,

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            // hex: true,
            // rgba: true,
            // hsla: true,
            // hsva: true,
            // cmyk: true,
            // input: true,
            clear: true,
            save: true
        }
    }
});
pickr.on('change', (color, instance) => {
    // console.log("Texted Color " + color.toHEXA().toString())
    // hexToRgb(color.toHEXA())
    // console.log()
    t_color = hexToRgb(color.toHEXA().toString())
});


const pickr2 = Pickr.create({
    el: '.color-picker-two',
    theme: 'monolith', // or 'monolith', or 'nano'
    // default:default_color,
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            // hex: true,
            // rgba: true,
            // hsla: true,
            // hsva: true,
            // cmyk: true,
            // input: true,
            clear: true,
            save: true
        }
    }

}).on('change', (color, instance) => {
    //console.log("background color"+ color.toHEXA().toString())
    // console.log(hexToRgb(color.toHEXA().toString()))
    // console.log(pickr2)
    b_color = hexToRgb(color.toHEXA().toString())
});