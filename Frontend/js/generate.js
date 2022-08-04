const text_gen = document.querySelector(".card-1")
const image_gen = document.querySelector(".card-2")
const emoji_gen = document.querySelector(".card-3")

text_gen.addEventListener("click", (e) => {
    window.location.pathname = "pages/generate_text.html"
})

image_gen.addEventListener("click", (e) => {
    window.location.pathname = "pages/generate_img.html"
})

emoji_gen.addEventListener("click", (e) => {
    window.location.pathname = "pages/generate_emoji.html"
})

// window.location.pathname = 'Frontend/pages/generate.html';