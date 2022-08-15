const headerbtn = document.getElementsByClassName("button-container");

const attach= document.getElementById("insert")

const user_menu=document.getElementById('mobile-menu-user-check')
const buttons = document.querySelectorAll('.check');

(() => {
    const token_info = window.localStorage.getItem("token_info");
    if (!token_info) {
        user_menu.innerHTML+=`<div class="mobile-menu-cards ">
        <a href="../pages/login.html">
          <div class="mobile-menu-logo">
            <img src="../images/logo/user-icon.svg" alt="">
          </div>
          <div class="mobile-menu-text">
            <p>Login</p>
          </div>
        </a>
      </div>`
      user_menu.innerHTML+=`<div class="mobile-menu-cards ">
      <a href="#">
        <div class="mobile-menu-logo">
          <img src="../images/logout.svg" alt="">
        </div>
        <div class="mobile-menu-text">
          <p>Register</p>
        </div>
      </a>
    </div>`
    }
    else {
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
        else {
            buttons.forEach(button => {
                button.remove();
            });
            attach.innerHTML= 
            `<div class="user-icon">
            <a href="../pages/profile.html">
              <div class="user-icon-img">
                <img src="../images/logo/user-icon.svg" alt="">
              </div>
              
            </a>
          </div>`
          user_menu.innerHTML+=`<div class="mobile-menu-cards ">
          <a href="../pages/profile.html">
            <div class="mobile-menu-logo">
              <img src="../images/logo/user-icon.svg" alt="">
            </div>
            <div class="mobile-menu-text">
              <p>User Profile</p>
            </div>
          </a>
        </div>`
        user_menu.innerHTML+=`<div class="mobile-menu-cards ">
        <a href="#">
          <div class="mobile-menu-logo">
            <img src="../images/logout.svg" alt="">
          </div>
          <div class="mobile-menu-text">
            <p>Log Out</p>
          </div>
        </a>
      </div>`
        }
    }
})();
