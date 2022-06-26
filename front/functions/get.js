let data = [];

/**
 * It fetches data from a server and then calls the pagination function.
 * @param admin - boolean
 */
export function get(admin) {
  fetch("http://localhost:3000/projet")
    .then((response) => response.json())
    .then((res) => {
      data = res;
      pagination(data, admin);
    });
}

/**
 * It takes two arguments, data and admin, and then it does a bunch of stuff.
 * @param data - the data that is returned from the server
 * @param admin - boolean
 */
function display(data, admin) {
  document.querySelector(".fiches").innerHTML = "";

  for (let art of data)

    document.querySelector(
      ".fiches"
    ).innerHTML +=
    `<div class="info" data-id="${art._id}">
      <div class="id">
        <div class='text'>
          <p id="uid" contenteditable=${admin}>${art.id}</p>
          <p id="nom" contenteditable=${admin}>${art.nom}</p>
          <p id="prenom" contenteditable=${admin}>${art.prenom}</p>
          <p id="naissance" contenteditable=${admin}>${art.naissance}</p>        
          <p id="ville" contenteditable=${admin}>${art.ville}</p>
        </div>
        <div class='img'>
          <img class='minImg' src="${art.photo}" alt='photo personne'/>
        </div>
      </div>
    <button class="detail">Détails</button>
  </div> `;
}

////////////// pagination /////////

/* Creating an array of arrays. The first array is called `pagination` and the second array is called
`page`. The first array is an array of arrays. The second array is an array of objects. */
function pagination(data, admin) {
  let pagination = [];
  let page = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 2 == 0 && i != 0) {
      pagination.push(page);
      page = [];
    } else {
      if (2 > data.length - 2 * pagination.length) {
        pagination.push(data.slice(i - 1, data.length))
        break
      } else if (2 >= (data.length - 1) - 2 * pagination.length) {
        pagination.push(data.slice(i - 1, data.length))
        break
      }
    }
    page.push(data[i]);
  }
  console.log(data)
  console.log(pagination)

  //mettre 12 à la place de 2 au dessus

  ////////// createElement pagination ///////////

  /* Creating a button for each page. */


  for (let j = 0; j < pagination.length; j++) {
    const btn = document.createElement("button");
    btn.className = `numPage numPage${j}`;
    btn.textContent = j + 1;
    document.querySelector(".pgn").insertBefore(btn, document.querySelector(".last"));

  }

  ////////// affichage de la premiere page de base ///////////////

  display(pagination[0], admin);

  /////////// affichage de la page correspondante ///////////////

  let current_page = 1
  document.querySelector(`.numPage0`).style.backgroundColor = "rgba(0, 0, 255, 0.564)"
  document.querySelector(`.numPage0`).style.color = "white"
  for (let i = current_page; i < pagination.length; i++) {
    if (parseInt(current_page, 10) + 3 <= i) {
      document.querySelector(`.numPage${i}`).style.display = 'none'
    }
  }
  for (let i = current_page; i < pagination.length; i++) {
    if (parseInt(current_page, 10) < i + 1) {
      document.querySelector(`.numPage${i}`).style.backgroundColor = "white"
      document.querySelector(`.numPage${i}`).style.color = "black"
    }
  }

  document.querySelector('.first').addEventListener("click", () => {
    current_page = 1

    for (let i = 0; i < pagination.length; i++) {
      if (parseInt(current_page, 10) + 3 <= i) {
        document.querySelector(`.numPage${i}`).style.display = 'none'
      } else if (parseInt(current_page, 10) + 3 >= i) {
        document.querySelector(`.numPage${i}`).style.display = 'block'
        document.querySelector(`.numPage0`).style.backgroundColor = "rgba(0, 0, 255, 0.564)"
        document.querySelector(`.numPage0`).style.color = "white"
      }
    }
    for (let i = current_page; i < pagination.length; i++) {
      if (parseInt(current_page, 10) < i + 1) {
        document.querySelector(`.numPage${i}`).style.backgroundColor = "white"
        document.querySelector(`.numPage${i}`).style.color = "black"
      }
    }
    display(pagination[0], admin);
  })


  document.querySelector('.last').addEventListener("click", () => {
    current_page = pagination.length

    for (let i = 0; i < pagination.length; i++) {
      if (parseInt(current_page, 10) - 5 >= i) {
        document.querySelector(`.numPage${i}`).style.display = 'none'
      } else if (parseInt(current_page, 10) - 5 <= i) {
        document.querySelector(`.numPage${i}`).style.display = 'block'
        document.querySelector(`.numPage${i}`).style.backgroundColor = "white"
        document.querySelector(`.numPage${i}`).style.color = "black"
        document.querySelector(`.numPage${parseInt(current_page, 10)-1}`).style.backgroundColor = "rgba(0, 0, 255, 0.564)"
        document.querySelector(`.numPage${parseInt(current_page, 10)-1}`).style.color = "white"
      }
    }
    display(pagination[parseInt(current_page, 10) - 1], admin);
  })


  document.querySelector(".pgn").addEventListener("click", (e) => {

    if (e.target.textContent >= 1000 || e.target.textContent == "Début" || e.target.textContent == "Fin") {
      return
    }
    document.querySelector(`.numPage`).style.backgroundColor = "white"
    current_page = e.target.textContent
    let displayPage = parseInt(current_page, 10)
    let p = e.target.textContent - 1;
    for (let i = 0; i < pagination.length; i++) {
      document.querySelector(`.numPage${i}`).style.backgroundColor = "white"
      document.querySelector(`.numPage${i}`).style.color = "black"
      if (displayPage + 2 <= i || i + 3 < displayPage) {
        document.querySelector(`.numPage${i}`).style.display = 'none'
      } else if (displayPage < displayPage + 2 || displayPage > displayPage - 3) {
        document.querySelector(`.numPage${i}`).style.display = 'block'
      }
    }

    document.querySelector(`.numPage${displayPage-1}`).style.backgroundColor = "rgba(0, 0, 255, 0.564)"
    document.querySelector(`.numPage${displayPage-1}`).style.color = "white"
    display(pagination[p], admin);

  });

  ///////////////// filter ////////////////////

  const searchBar = document.querySelector(".nom");
  const searchBar2 = document.querySelector(".prenom");
  let searchBar3 = document.querySelector(".ville");

  /* Listening for a keyup event on the search bar. When a keyup event is detected, it takes the value of
  the search bar and makes it lowercase. Then it filters the data array and returns the data that
  includes the input. If the search bar is empty, it displays the first page of the pagination.
  Otherwise, it displays the filtered data. */
  searchBar.addEventListener("keyup", () => {
    let input = searchBar.value;
    input = input.toLowerCase();
    const filter = data.filter((hub) => {
      return hub.nom.toLowerCase().includes(input);
    });
    if (searchBar.value == "" && searchBar2.value == "" && searchBar3.value == "") {
      display(pagination[0], admin);
    } else {
      display(filter, admin);
    }
  });

  searchBar2.addEventListener("keyup", () => {
    let input = searchBar2.value;
    input = input.toLowerCase();
    const filter = data.filter((hub) => {
      return hub.prenom.toLowerCase().includes(input);
    });
    if (searchBar.value == "" && searchBar2.value == "" && searchBar3.value == "") {
      display(pagination[0], admin);
    } else {
      display(filter, admin);
    }
  });

  searchBar3.addEventListener("keyup", () => {
    let input = searchBar3.value;
    input = input.toLowerCase();
    const filter = data.filter((hub) => {
      return hub.ville.toLowerCase().includes(input);
    });
    if (searchBar.value == "" && searchBar2.value == "" && searchBar3.value == "") {
      display(pagination[0], admin);
    } else {
      display(filter, admin);
    }
  });
}

///////// get by ID //////////

///////// fiche détaillée //////////
let perso = [];

document.querySelector("main").addEventListener("click", (e) => {
  if (e.target.textContent == "Détails") {

    document.querySelector(".fiches").style.display = "none";
    document.querySelector(".perso").style.display = "flex";

    /* Fetching data from the server and then it is calling the `affiche` function. */
    fetch(
        `http://localhost:3000/projet/${e.target.parentNode.getAttribute("data-id")}`
      )
      .then((response) => response.json())
      .then((res) => {
        perso = res;
        if (localStorage.getItem('token')) {
          return affiche(perso, true);
        }
        affiche(perso)
      });

    /**
     * It displays the information of a person in a bigger window.
     * </code>
     * @param perso - the object that contains all the data
     * @param admin - boolean
     */
    function affiche(perso, admin) {
      document.querySelector(
        ".perso"
      ).innerHTML = ` <div class="infoBig" data-id="${perso[0]._id}">
                      <button class="retourH">retour</button>
                      <div class="idBig">
                        <div class='haut'>
                          <div class='textBig'>
                            <p id="uidBig" contenteditable=${admin}>${perso[0].id}</p>
                            <p id="nomBig" contenteditable=${admin}>${perso[0].nom}</p>
                            <p id="prenomBig" contenteditable=${admin}>${perso[0].prenom}</p>
                            <p id="naissanceBig" contenteditable=${admin}>${perso[0].naissance}</p>        
                            <p id="villeBig" contenteditable=${admin}>${perso[0].ville}</p>
                            
                          </div>
                          <div class='imgBig'>
                            <img class='bigImg' src="${perso[0].photo}" alt='photo personne'/>
                          </div>
                        </div>
                        <div>
                            <p id="parent1" class="get" data-id="${perso[0].parentSo1}">Pere : <span class="np1" data-id="${perso[0].parentSo1}"> ${perso[0].parentId1}<span></p>
                            <p id="parent2" class="get" data-id="${perso[0].parentSo2}"> Mere : <span class="np2" data-id="${perso[0].parentSo2}">${perso[0].parentId2}<span></p>
                            <p id="enfant1" class="get" data-id="${perso[0].enfantSo1}"> Enfant 1 : <span class="ne1" data-id="${perso[0].enfantSo1}">${perso[0].enfantId1}<span></p>
                            <p id="enfant2" class="get" data-id="${perso[0].enfantSo2}"> Enfant 2 : <span class="ne2" data-id="${perso[0].enfantSo2}">${perso[0].enfantId2}<span></p>
                            <p id="enfant3" class="get" data-id="${perso[0].enfantSo3}"> Enfant 3 : <span class="ne3"data-id="${perso[0].enfantSo3}">${perso[0].enfantId3}<span></p>
                            <p id="enfant4" class="get" data-id="${perso[0].enfantSo4}"> Enfant 4 : <span class="ne4" data-id="${perso[0].enfantSo4}">${perso[0].enfantId4}<span></p>
                            <p id="enfant5" class="get" data-id="${perso[0].enfantSo5}"> Enfant 5 : <span class="ne5" data-id="${perso[0].enfantSo5}">${perso[0].enfantId5}<span></p>
                            <p id="enfant6" class="get" data-id="${perso[0].enfantSo6}"> Enfant 6 : <span class="ne6" data-id="${perso[0].enfantSo6}">${perso[0].enfantId6}<span></p>
                            </div>
                        <div class='bas'>
                        <p id="decriptionBig" contenteditable=${admin}>${perso[0].description}</p>
                        </div>
                      </div>
                      <div class="but">
                        <button class="sup">supprimer</button>
                        <button class="edit">editer</button>
                      </div>
                      <button class="retour">retour</button>
                    </div> `;

      if (document.querySelector('#parent1').textContent === " Pere : ") {
        document.querySelector('#parent1').style.display = 'none'
      }
      if (document.querySelector('#parent2').textContent === " Mere : ") {
        document.querySelector('#parent2').style.display = 'none'
      }
      if (document.querySelector('#enfant1').textContent === " Enfant 1 : ") {
        document.querySelector('#enfant1').style.display = 'none'
      }
      if (document.querySelector('#enfant2').textContent === " Enfant 2 : ") {
        document.querySelector('#enfant2').style.display = 'none'
      }
      if (document.querySelector('#enfant3').textContent === " Enfant 3 : ") {
        document.querySelector('#enfant3').style.display = 'none'
      }
      if (document.querySelector('#enfant4').textContent === " Enfant 4 : ") {
        document.querySelector('#enfant4').style.display = 'none'
      }
      if (document.querySelector('#enfant5').textContent === " Enfant 5 : ") {
        document.querySelector('#enfant5').style.display = 'none'
      }
      if (document.querySelector('#enfant6').textContent === " Enfant 6 : ") {
        document.querySelector('#enfant6').style.display = 'none'
      }
    }
  }

  if (e.target.textContent == "retour") {
    document.querySelector(".fiches").style.display = "grid";
    document.querySelector(".perso").style.display = "none";
  }

});
///////// lien de parenté //////////
document.querySelector("main").addEventListener("click", (e) => {

  if (e.target.getAttribute("data-id") === "") {
    return
  } else if (e.target.className === "get" || e.target.tagName.toLowerCase() === 'span') {
    console.log(e.target.getAttribute("data-id"))
    document.querySelector(
      ".perso"
    ).innerHTML = ""

    fetch(
        `http://localhost:3000/projet/parent/${e.target.getAttribute("data-id")}`
      )
      .then((response) => response.json())
      .then((res) => {
        perso = res;
        if (localStorage.getItem('token')) {
          return affiche(perso, true);
        }

        affiche(perso)
      });

    function affiche(perso, admin) {
      document.querySelector(
        ".perso"
      ).innerHTML = ` <div class="infoBig" data-id="${perso[0]._id}">
      <button class="retourH">retour</button>
      <div class="idBig">
        <div class='haut'>
          <div class='textBig'>
            <p id="uidBig" contenteditable=${admin}>${perso[0].id}</p>
            <p id="nomBig" contenteditable=${admin}>${perso[0].nom}</p>
            <p id="prenomBig" contenteditable=${admin}>${perso[0].prenom}</p>
            <p id="naissanceBig" contenteditable=${admin}>${perso[0].naissance}</p>        
            <p id="villeBig" contenteditable=${admin}>${perso[0].ville}</p>
            
          </div>
          <div class='imgBig'>
            <img class='bigImg' src="${perso[0].photo}" alt='photo personne'/>
          </div>
        </div>
        <div>
            <p id="parent1" class="get" data-id="${perso[0].parentSo1}">Pere : <span class="np1" data-id="${perso[0].parentSo1}"> ${perso[0].parentId1}<span></p>
            <p id="parent2" class="get" data-id="${perso[0].parentSo2}"> Mere : <span class="np2" data-id="${perso[0].parentSo2}">${perso[0].parentId2}<span></p>
            <p id="enfant1" class="get" data-id="${perso[0].enfantSo1}"> Enfant 1 : <span class="ne1" data-id="${perso[0].enfantSo1}">${perso[0].enfantId1}<span></p>
            <p id="enfant2" class="get" data-id="${perso[0].enfantSo2}"> Enfant 2 : <span class="ne2" data-id="${perso[0].enfantSo2}">${perso[0].enfantId2}<span></p>
            <p id="enfant3" class="get" data-id="${perso[0].enfantSo3}"> Enfant 3 : <span class="ne3"data-id="${perso[0].enfantSo3}">${perso[0].enfantId3}<span></p>
            <p id="enfant4" class="get" data-id="${perso[0].enfantSo4}"> Enfant 4 : <span class="ne4" data-id="${perso[0].enfantSo4}">${perso[0].enfantId4}<span></p>
            <p id="enfant5" class="get" data-id="${perso[0].enfantSo5}"> Enfant 5 : <span class="ne5" data-id="${perso[0].enfantSo5}">${perso[0].enfantId5}<span></p>
            <p id="enfant6" class="get" data-id="${perso[0].enfantSo6}"> Enfant 6 : <span class="ne6" data-id="${perso[0].enfantSo6}">${perso[0].enfantId6}<span></p>
        <div class='bas'>
        <p id="decriptionBig" contenteditable=${admin}>${perso[0].description}</p>
        </div>
      </div>
      <div class="but">
        <button class="sup">supprimer</button>
        <button class="edit">editer</button>
      </div>
      <button class="retour">retour</button>
    </div> `;

      if (document.querySelector('#parent1').textContent === " Pere : ") {
        document.querySelector('#parent1').style.display = 'none'
      }
      if (document.querySelector('#parent2').textContent === " Mere : ") {
        document.querySelector('#parent2').style.display = 'none'
      }
      if (document.querySelector('#enfant1').textContent === " Enfant 1 : ") {
        document.querySelector('#enfant1').style.display = 'none'
      }
      if (document.querySelector('#enfant2').textContent === " Enfant 2 : ") {
        document.querySelector('#enfant2').style.display = 'none'
      }
      if (document.querySelector('#enfant3').textContent === " Enfant 3 : ") {
        document.querySelector('#enfant3').style.display = 'none'
      }
      if (document.querySelector('#enfant4').textContent === " Enfant 4 : ") {
        document.querySelector('#enfant4').style.display = 'none'
      }
      if (document.querySelector('#enfant5').textContent === " Enfant 5 : ") {
        document.querySelector('#enfant5').style.display = 'none'
      }
      if (document.querySelector('#enfant6').textContent === " Enfant 6 : ") {
        document.querySelector('#enfant6').style.display = 'none'
      }
    }
  }
  if (e.target.textContent == "retour") {
    document.querySelector(".fiches").style.display = "grid";
    document.querySelector(".perso").style.display = "none";
  }

})


document.querySelector('body').addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === 'span') {
    console.log(e.target.getAttribute('data-id'))
  }
})