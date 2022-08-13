(() => {
  const token_info = window.localStorage.getItem("token_info");
  if (!token_info) {
    window.localStorage.setItem("redirect", "true");
    window.location.pathname = "/Frontend/pages/login.html";
  } else {
    nowDate = new Date();
    const token = JSON.parse(token_info);
    const tokenDate = new Date(token.expiry);
    const hours = Math.abs(nowDate - tokenDate) / (60 * 60 * 1000) - 9.5;
    if (hours > 6) {
      window.localStorage.removeItem("token_info");
      window.location.pathname = "/Frontend/pages/login.html";
    }
  }
  // for (const key in token_info) {
  //     console.log(token_info[key])
})();
