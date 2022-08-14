(() => {
  const token_info = window.localStorage.getItem("token_info");
  if (!token_info) {
    window.localStorage.setItem("redirect", "true");
    window.location.pathname = "/Favicon-Gen-Team-69/pages/login.html";
  } else {
    nowDate = new Date();
    const token = JSON.parse(token_info);
    const tokenDate = new Date(token.expiry);
    let hours = Math.abs(((nowDate - tokenDate) / (60 * 60 * 1000))) - 10;
    hours = Math.abs(hours)
    if (hours > 6) {
      window.localStorage.removeItem("token_info");
      window.localStorage.setItem("redirect", "true");
      window.location.pathname = "/Favicon-Gen-Team-69/pages/login.html";
    }
  }
})();
