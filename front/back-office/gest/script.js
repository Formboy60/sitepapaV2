import { isLogin } from "../login/fb/fb.js";
isLogin("../../front-office/index.html");
import { get } from "../../functions/get.js";

let userId = document.querySelector(".uid");
let nom = document.querySelector(".name");
let prenom = document.querySelector(".prename");
let dateNaissance = document.querySelector(".dateNaissance");

get(true);

///////// delete front ///////////

document.querySelector("main").addEventListener("click", (e) => {
  if (e.target.className === "sup") {
    fetch(`http://localhost:3000/projet/${e.target.parentNode.dataset.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (res) => (document.querySelector(".result").textContent = res.message)
      );
  } else if (e.target.className === "edit") {
    //////////// put front /////////////

    console.log(e.target.parentNode.childNodes[1].childNodes[1].childNodes[9].textContent);
    const newArticle = {
      nom: e.target.parentNode.childNodes[1].childNodes[1].childNodes[3].textContent,
      prenom: e.target.parentNode.childNodes[1].childNodes[1].childNodes[5].textContent,
      naissance: e.target.parentNode.childNodes[1].childNodes[1].childNodes[7].textContent,
      ville: e.target.parentNode.childNodes[1].childNodes[1].childNodes[9].textContent,
      id: e.target.parentNode.childNodes[1].childNodes[1].childNodes[1].textContent,
    };

    fetch(
      `http://localhost:3000/projet/${e.target.parentNode.dataset.id}`,

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
        (res) => (document.querySelector(".result").textContent = res.message)
      )
      .then(function (res) {
        localStorage.setItem("UserID", res.uid);
      })
      .catch(function (res) {
        console.log(res);
      });
  }
});
