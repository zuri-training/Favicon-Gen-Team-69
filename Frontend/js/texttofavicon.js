const url='https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD9x1uTZJYIotU_maFzogT5YjZ90xwfKnc'
const font_style = document.getElementById('font-style')
const font_variants = document.getElementById('font-variant')
//let font_style=document.querySelector('font-style')
getData();

async function getData(){
    const response = await fetch(url);
    const data= await response.json();
    // console.log(data.items.length)
    
    // console.log(data.items[5]['family'])
    // console.log(data.items['family'])
    
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
        // return data.items['family'] == d
        // return data.items.map(item => item['family']) == String(d)
        return value['family'] == d
    })
    console.log(typeof(font_variant))
    console.log("Font Variant Print")
    console.log(font_variant[0]['variants'].length)
    // console.log("Done!")

    //main
    // let select_options =  font_variant.map(item => `<option value=${item['variants']}> ${item['variants']}</option>`).join
    // ('\n');
    // //console.log(item['variants'].length)
    // // console.log("aHERE")
    // font_variants.innerHTML=select_options

    let loopcounter = font_variant[0]['variants'].length
    let i=0
    for(i=0 ; i<loopcounter ; i++){
        console.log(font_variant[0]['variants'].length)
        console.log(font_variant[0]['variants'])
        font_variants.innerHTML+=`<option value="font_variant"> ${font_variant[0]['variants'][i]}</option>`
        console.log("Running")
    }

}



