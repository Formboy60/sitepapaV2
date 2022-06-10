import { isLogin } from "../login/fb/fb.js";
isLogin("../../front-office/index.html");
import { get } from "../../functions/get.js";
import { uploadFile } from "../login/fb/fb.js";


get(true);

let userId = document.querySelector(".uid");
let nom = document.querySelector(".name");
let prenom = document.querySelector(".prename");
let dateNaissance = document.querySelector(".dateNaissance");
let villeNaissance = document.querySelector(".villeNaissance");
let description = document.querySelector(".description");
let nomPhoto = document.querySelector(".photo");
let fichier = document.querySelector(".upload");
let loader = document.querySelector('.loader')

function reset(){
  document.querySelector('.result').textContent = ""
}

function reload(){
  console.log('coucou');
  location.reload()
}

///////// delete front ///////////

document.querySelector("main").addEventListener("click", (e) => {
  if (e.target.className === "sup") {
    loader.style.display = "flex"
    fetch(`http://localhost:3000/projet/${e.target.parentNode.parentNode.dataset.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (res) => {
          loader.style.display = "none"
          document.querySelector(".result").textContent = res.message
          setTimeout(reset, 2000)
          setTimeout(reload, 1000)
        }
      )
      .catch((res) => {
        loader.style.display = "none"
        document.querySelector(".result").textContent = res.message
          setTimeout(reset, 2000);
      });
  } else if (e.target.className === "edit") {
    //////////// put front /////////////
    

    loader.style.display = "flex"
    const p = document.createElement("p");
    p.textContent = description.value;
    p.innerHTML = p.innerHTML.replace(/\n/g, "<br>\n");

    const newArticle = {
      nom: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3].textContent,
      prenom: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[5].textContent,
      naissance: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[7].textContent,
      ville: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[9].textContent,
      description: p.innerHTML,
      id: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[1].textContent,
    };

    fetch(
      `http://localhost:3000/projet/${e.target.parentNode.parentNode.dataset.id}`,

      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },

        body: JSON.stringify(newArticle),
      }
    )
      .then((res) => res.json())
      .then(
        (res) => {
          loader.style.display = "none"
          document.querySelector(".result").textContent = res.message
          setTimeout(reset, 2000)
          setTimeout(reload, 1000)
        }
      )
      .catch((res) => {
        loader.style.display = "none"
        document.querySelector(".result").textContent = res.message
          setTimeout(reset, 2000);
      });
  }
});



//////// upload photo ///////////

fichier.addEventListener("change", () => {
  uploadFile(fichier.files[0], fichier.files[0].name, nomPhoto);
});

/////////// post front /////////
document.querySelector(".valide").addEventListener("click", () => {
  loader.style.display = "flex"
  
  const p = document.createElement("p");
  p.textContent = description.value;
  p.innerHTML = p.innerHTML.replace(/\n/g, "<br>\n");

  const newFiche = {
    id: userId.value,
    nom: nom.value,
    prenom: prenom.value,
    naissance: dateNaissance.value,
    ville: villeNaissance.value,
    description: p.innerHTML,
    photo: nomPhoto.value,
  };

  fetch("http://localhost:3000/projet/arbres", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },

    body: JSON.stringify(newFiche),
  })
    .then((res) => res.json())
    .then(
      (res) => {
        loader.style.display = "none"
        document.querySelector(".result").textContent = res.message
        setTimeout(reset, 2000)
        setTimeout(reload, 1000)
      }
    )
    .catch((res) => {
      loader.style.display = "none"
      document.querySelector(".result").textContent = res.message
        setTimeout(reset, 2000);
    });
});
