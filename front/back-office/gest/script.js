import {
  isLogin
} from "../login/fb/fb.js";
isLogin("../../front-office/index.html");
import {
  get
} from "../../functions/get.js";
import {
  uploadFile
} from "../login/fb/fb.js";


get(true);

let userId = document.querySelector(".uid");
let nom = document.querySelector(".name");
let prenom = document.querySelector(".prename");
let dateNaissance = document.querySelector(".dateNaissance");
let villeNaissance = document.querySelector(".villeNaissance");
let description = document.querySelector(".description");
let nomPhoto = document.querySelector(".photo");
let fichier = document.querySelector(".upload");
let parentId1 = document.querySelector('.p1')
let parentSo1 = document.querySelector('.n1')
let parentId2 = document.querySelector('.p2')
let parentSo2 = document.querySelector('.n2')
let enfantId1 = document.querySelector('.e1')
let enfantSo1 = document.querySelector('.en1')
let enfantId2 = document.querySelector('.e2')
let enfantSo2 = document.querySelector('.en2')
let enfantId3 = document.querySelector('.e3')
let enfantSo3 = document.querySelector('.en3')
let enfantId4 = document.querySelector('.e4')
let enfantSo4 = document.querySelector('.en4')
let enfantId5 = document.querySelector('.e5')
let enfantSo5 = document.querySelector('.en5')
let enfantId6 = document.querySelector('.e6')
let enfantSo6 = document.querySelector('.en6')

let loader = document.querySelector('.loader')



function reset() {
  document.querySelector('.result').textContent = ""
}

function reload() {
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
          if(res.message == 'Veuillez vous connecter'){
            return
          }
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

let descriptionBig =  e.target.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[1].textContent




    loader.style.display = "flex"
    const p = document.createElement("p");
   if(description.value == ""){
    p.textContent = descriptionBig
   } else { p.textContent = description.value}
    p.innerHTML = p.innerHTML.replace(/\n/g, "<br>\n");
  console.log(p.innerHTML)

 
   if(parentId1.value == ""){
    parentId1.value = document.querySelector(".np1").textContent
   }
   if(parentSo1.value ==""){
    parentSo1.value = e.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[1].getAttribute('data-id')
   }

   if(parentId2.value == ""){
    parentId2.value = document.querySelector(".np2").textContent
   }
   if(parentSo2.value ==""){
    parentSo2.value = e.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[3].getAttribute('data-id')
   }

   if(enfantId1.value == ""){
    enfantId1.value = document.querySelector(".ne1").textContent
   }
   if(enfantSo1.value ==""){
    enfantSo1.value = e.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[5].getAttribute('data-id')
   }

   if(enfantId2.value == ""){
    enfantId2.value = document.querySelector(".ne2").textContent
   }
   if(enfantSo2.value ==""){
    enfantSo2.value = e.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[7].getAttribute('data-id')
   }

   if(enfantId3.value == ""){
    enfantId3.value = document.querySelector(".ne3").textContent
   }
   if(enfantSo3.value ==""){
    enfantSo3.value = e.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[9].getAttribute('data-id')
   }

   if(enfantId4.value == ""){
    enfantId4.value = document.querySelector(".ne4").textContent
   }
   if(enfantSo4.value ==""){
    enfantSo4.value = e.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[11].getAttribute('data-id')
   }

   if(enfantId5.value == ""){
    enfantId5.value = document.querySelector(".ne5").textContent
   }
   if(enfantSo5.value ==""){
    enfantSo5.value = e.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[13].getAttribute('data-id')
   }

   if(enfantId6.value == ""){
    enfantId6.value = document.querySelector(".ne6").textContent
   }
   if(enfantSo6.value ==""){
    enfantSo6.value = e.target.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[15].getAttribute('data-id')
   }



    const newArticle = {
      nom: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3].textContent,
      prenom: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[5].textContent,
      naissance: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[7].textContent,
      ville: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[9].textContent,
      description:  p.innerHTML,
      id: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[1].textContent,
      parentId1: parentId1.value,
      parentSo1: parentSo1.value,
      parentId2: parentId2.value,
      parentSo2: parentSo2.value,
      enfantId1: enfantId1.value,
      enfantSo1: enfantSo1.value,
      enfantId2: enfantId2.value,
      enfantSo2: enfantSo2.value,
      enfantId3: enfantId3.value,
      enfantSo3: enfantSo3.value,
      enfantId4: enfantId4.value,
      enfantSo4: enfantSo4.value,
      enfantId5: enfantId5.value,
      enfantSo5: enfantSo5.value,
      enfantId6: enfantId6.value,
      enfantSo6: enfantSo6.value,
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
          console.log(res)
          document.querySelector(".result").textContent = res.message
          if(res.message == 'Veuillez vous connecter'){
            return
          }
          // setTimeout(reset, 2000)
          // setTimeout(reload, 1000)
        }
      )
      .catch((res) => {
        loader.style.display = "none"
        document.querySelector(".result").textContent = res.message
        console.log('erreur')
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
    parentId1: parentId1.value,
    parentSo1: parentSo1.value,
    parentId2: parentId2.value,
    parentSo2: parentSo2.value,
    enfantId1: enfantId1.value,
    enfantSo1: enfantSo1.value,
    enfantId2: enfantId2.value,
    enfantSo2: enfantSo2.value,
    enfantId3: enfantId3.value,
    enfantSo3: enfantSo3.value,
    enfantId4: enfantId4.value,
    enfantSo4: enfantSo4.value,
    enfantId5: enfantId5.value,
    enfantSo5: enfantSo5.value,
    enfantId6: enfantId6.value,
    enfantSo6: enfantSo6.value,
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
        if(res.message == 'Veuillez vous connecter'){
          return
        }
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