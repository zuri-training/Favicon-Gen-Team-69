(() => {
    token = window.localStorage.getItem("token")
    window.localStorage.setItem("redirect", "true")
    if (!token) {
        window.location.pathname = "/Frontend/pages/login.html"
    }
})()