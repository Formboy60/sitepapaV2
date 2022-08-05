import { isLogin, uploadFile, getToken } from "../login/fb/fb.js";
import { get } from "../../functions/get.js";

isLogin("../../index.html");
get(true);

let userId = document.querySelector(".uid");
let nom = document.querySelector(".name");
let prenom = document.querySelector(".prename");
let dateNaissance = document.querySelector(".dateNaissance");
let villeNaissance = document.querySelector(".villeNaissance");
let description = document.querySelector(".description");
let nomPhoto = document.querySelector(".photo");
let fichier = document.querySelector(".upload");
let nomPhoto2 = document.querySelector(".photo2");
let fichier2 = document.querySelector(".upload2");
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
let enfantId7 = document.querySelector('.e7')
let enfantSo7 = document.querySelector('.en7')
let enfantId8 = document.querySelector('.e8')
let enfantSo8 = document.querySelector('.en8')
let enfantId9 = document.querySelector('.e9')
let enfantSo9 = document.querySelector('.en9')
let enfantId10 = document.querySelector('.e10')
let enfantSo10 = document.querySelector('.en10')
let enfantId11 = document.querySelector('.e11')
let enfantSo11 = document.querySelector('.en11')
let enfantId12 = document.querySelector('.e12')
let enfantSo12 = document.querySelector('.en12')
let enfantId13 = document.querySelector('.e13')
let enfantSo13 = document.querySelector('.en13')
let enfantId14 = document.querySelector('.e14')
let enfantSo14 = document.querySelector('.en14')
let enfantId15 = document.querySelector('.e15')
let enfantSo15 = document.querySelector('.en15')
let conjointId1 = document.querySelector('.c1')
let conjointSo1 = document.querySelector('.cn1')
let conjointId2 = document.querySelector('.c2')
let conjointSo2 = document.querySelector('.cn2')
let conjointId3 = document.querySelector('.c3')
let conjointSo3 = document.querySelector('.cn3')

let loader = document.querySelector('.loader')



function reset() {
  document.querySelector('.result').textContent = ""
}

function reload() {
  location.reload()
}

///////// delete front ///////////


document.querySelector("main").addEventListener("click", (e) => {
  if(e.target.id === "sup1"){
    document.querySelector('#sup1').style.display = 'none'
    document.querySelector('#sup2').style.display = 'block'
  }
 
  if (e.target.id === "sup2") {
    loader.style.display = "flex"
    fetch(`https://murmuring-peak-73024.herokuapp.com/projet/${e.target.parentNode.parentNode.dataset.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.json())
      .then(
        (res) => {
          getToken.then((token) => {
            localStorage.setItem("token", token);
          });
          loader.style.display = "none"
          document.querySelector(".result").textContent = res.message
          if(res.message == 'Veuillez vous connecter'){
            return
          }
          window.scroll(0,0)
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



for (let i=1; i<= 2; i++){
  if(document.querySelector(`.p${[i]}`).value == ""){
    document.querySelector(`.p${[i]}`).value = document.querySelector(`.np${[i]}`).textContent
     }
  if(document.querySelector(`.n${[i]}`).value ==""){
    document.querySelector(`.n${[i]}`).value = document.querySelector(`#parent${[i]}`).getAttribute('data-id')
  }
} 

for(let i=1; i<=15; i++){
  if(document.querySelector(`.e${[i]}`).value == ""){
    document.querySelector(`.e${[i]}`).value = document.querySelector(`.ne${[i]}`).textContent
     }
  if(document.querySelector(`.en${[i]}`).value ==""){
    document.querySelector(`.en${[i]}`).value = document.querySelector(`#enfant${[i]}`).getAttribute('data-id')
    }
}

for(let i=1; i<=3; i++){
  if(document.querySelector(`.c${[i]}`).value == ""){
    document.querySelector(`.c${[i]}`).value = document.querySelector(`.nc${[i]}`).textContent
     }
  if(document.querySelector(`.cn${[i]}`).value ==""){
    document.querySelector(`.cn${[i]}`).value = document.querySelector(`#conjoint${[i]}`).getAttribute('data-id')
    }
}

   if(nomPhoto.value ==""){
    nomPhoto.value = e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[3].childNodes[1].src
   }

  //  if(nomPhoto2.value ==""){
  //   nomPhoto2.value = e.target.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[3].childNodes[1].src
  //  }


    const newArticle = {
      nom: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[3].textContent,
      prenom: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[5].textContent,
      naissance: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[7].textContent,
      ville: e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].childNodes[9].textContent,
      photo : nomPhoto.value,
      photo2 : nomPhoto2.value,
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
      enfantId7: enfantId7.value,
      enfantSo7: enfantSo7.value,
      enfantId8: enfantId8.value,
      enfantSo8: enfantSo8.value,
      enfantId9: enfantId9.value,
      enfantSo9: enfantSo9.value,
      enfantId10: enfantId10.value,
      enfantSo10: enfantSo10.value,
      enfantId11: enfantId11.value,
      enfantSo11: enfantSo11.value,
      enfantId12: enfantId12.value,
      enfantSo12: enfantSo12.value,
      enfantId13: enfantId13.value,
      enfantSo13: enfantSo13.value,
      enfantId14: enfantId14.value,
      enfantSo14: enfantSo14.value,
      enfantId15: enfantId15.value,
      enfantSo15: enfantSo15.value,
      conjointId1 : conjointId1.value,
      conjointSo1 : conjointSo1.value,
      conjointId2 : conjointId2.value,
      conjointSo2 : conjointSo2.value,
      conjointId3 : conjointId3.value,
      conjointSo3 : conjointSo3.value,
    };

    fetch(
        `https://murmuring-peak-73024.herokuapp.com/projet/${e.target.parentNode.parentNode.dataset.id}`,

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
          getToken.then((token) => {
            localStorage.setItem("token", token);
          });
          loader.style.display = "none"
          console.log(res)
          document.querySelector(".result").textContent = res.message
          if(res.message == 'Veuillez vous connecter'){
            return
          }
          window.scroll(0,0)
          setTimeout(reset, 2000)
          setTimeout(reload, 1000)
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

fichier2.addEventListener("change", () => {
  uploadFile(fichier2.files[0], fichier2.files[0].name, nomPhoto2);
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
    photo2: nomPhoto2.value,
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
    enfantId7: enfantId7.value,
    enfantSo7: enfantSo7.value,
    enfantId8: enfantId8.value,
    enfantSo8: enfantSo8.value,
    enfantId9: enfantId9.value,
    enfantSo9: enfantSo9.value,
    enfantId10: enfantId10.value,
    enfantSo10: enfantSo10.value,
    enfantId11: enfantId11.value,
    enfantSo11: enfantSo11.value,
    enfantId12: enfantId12.value,
    enfantSo12: enfantSo12.value,
    enfantId13: enfantId13.value,
    enfantSo13: enfantSo13.value,
    enfantId14: enfantId14.value,
    enfantSo14: enfantSo14.value,
    enfantId15: enfantId15.value,
    enfantSo15: enfantSo15.value,
    conjointId1 : conjointId1.value,
    conjointSo1 : conjointSo1.value,
    conjointId2 : conjointId2.value,
    conjointSo2 : conjointSo2.value,
    conjointId3 : conjointId3.value,
    conjointSo3 : conjointSo3.value,
  };



  fetch("https://murmuring-peak-73024.herokuapp.com/projet/arbres", {
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
        getToken.then((token) => {
          localStorage.setItem("token", token);
        });
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

