import { uploadFile } from "../login/fb/fb.js";

let userId = document.querySelector(".uid");
let nom = document.querySelector(".name");
let prenom = document.querySelector(".prename");
let dateNaissance = document.querySelector(".dateNaissance");
let villeNaissance = document.querySelector(".villeNaissance");
let description = document.querySelector(".description");
let nomPhoto = document.querySelector(".photo");
let fichier = document.querySelector(".upload");

////////// is login ////////
import { isLogin } from "../login/fb/fb.js";
isLogin("../../front-office/index.html");

//////// upload photo ///////////

fichier.addEventListener("change", () => {
  uploadFile(fichier.files[0], fichier.files[0].name, nomPhoto);
});

/////////// post front /////////
document.querySelector(".valide").addEventListener("click", () => {
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
      (res) => (document.querySelector(".result").textContent = res.message)
    )
    .catch(function (res) {
      console.log(res);
    });
});
