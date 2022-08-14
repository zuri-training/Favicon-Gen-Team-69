const token_info = window.localStorage.getItem("token_info");
const token = JSON.parse(token_info).token;
const url = "https://faviconify-rest-api.herokuapp.com/api/user/1/";
const favicons_url = "https://faviconify-rest-api.herokuapp.com/api/favicons/";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${token}`,
};

fetch(url, {
  method: "GET",
  headers: headers,
})
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 401) {
      window.localStorage.removeItem("token_info");
      window.localStorage.setItem("redirect", "true");
      window.location.pathname = "Frontend/pages/login.html";
    } else if (response.status === 500) {
      window.localStorage.removeItem("token_token");
      window.location.pathname = "Frontend/pages/login.html";
    }
  })
  .then((data) => {
    user = data;
    body = document.querySelector("body");
    body.innerHTML = `
    <div class="Profile">
    <div class="profile__head">
      <h5>User Profile</h5>
      <div class="buttons">
        <a href="generate.html"><button class="btn">New favicon</button></a>
        <button id="logout" class="btn-primary">Logout</button>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="card__body">
      <div class="img-card">
        <img
          src="../images/590-5904853_glen-circle-profile-fundraising 1.png"
          alt=""
        />
      </div>
      <div class="images">
        <img src="../images/Group.png" alt="" />
      </div>

      <div class="text">
        <h6>Profile Details</h6>
        <div class="text-edit">
        <p>${user.username}</p>
        <img src="../images/edit-icon.png" alt="" />
      </div>
      </div>


      <div class="card">
        <h5>First Name:</h5>
        <p>${user.first_name ? user.first_name : "click edit to set"}</p>
        <img src="../images/edit-icon.png" alt="" />
      </div>
      <hr />

      
      <div class="card">
        <h5>Last Name:</h5>
        <p>${user.last_name ? user.last_name : "click edit to set"}</p>
        <img src="../images/edit-icon.png" alt="" />
      </div>
      <hr />

      <div class="card">
        <h5>Email:</h5>
        <p>${user.email}</p>
        <img src="../images/edit-icon.png" alt="" />
      </div>
      <hr />

      <div class="card">
        <h5>Phone number:</h5>
        <p>${user.last_name ? user.last_name : "click edit to set"}</p>
        <img src="../images/edit-icon.png" alt="" />
      </div>
      <hr />

    

      <button class="btn-secondary">Save changes</button>
    </div>
    <div>
    </div>
    <div>
    </div>
    
 

  <div class="profile__card">
    <div class="profile">
      <div class="img__flex">
        <h5>Saved Favicons</h5>
        <div class="add">
          <a href="generate.html"><img src="../images/carbon_task-add.png" alt="add"></a>
        </div>
      </div>    

     
    </div>
  </div>
</div>
<button class="logout-primary">Logout</button>`;
}).then(() => {
  load_favicons()
});

const load_favicons = () => {
  const profile__card = document.querySelector(".profile");
  const profile_flex = document.querySelectorAll(".profile__card-flex");
  if (profile_flex.length > 0) {
    profile_flex.forEach((card) => {
      card.parentElement.removeChild(card)
    })
  }
  
  fetch(favicons_url, {
    "Content-Type": "application/json",
    headers: headers,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      if (data.length < 1) {
        profile__card.insertAdjacentHTML(
          "afterend",
          `
  <p class="card"> No Icons saved yet, click generate to start one </p>    
      `
        );
      } else {
        data.forEach((favicon) => {
          profile__card.insertAdjacentHTML(
            "afterend",
            `
            <div class ="profile__card-flex">
          <div class="round-img">
        <img class="round" src="../images/Vector22.png" alt="" />
        </div>
        <p>${favicon.title ? favicon.title : "My Favicon"}</p>
        <a href=${favicon.zip_file}>
        <div class="circle-img">
        <img src="../images/Vector- 24.png" alt="download" />
        </div>
        </a>
        <div class="circle-img">
        <img src="../images/Vector-23.png" onclick="deleteFav(${
          favicon.id
        })" alt="delete" />
        </div>
      </div>`
          );
        });
      }
    })
}

const deleteFav = (id) => {
  fetch("https://faviconify-rest-api.herokuapp.com/api/favicon/" + id + "/", {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (response.status === 204) {
      load_favicons();
    };
  });
};
