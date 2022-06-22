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
        pagination.push(data.slice(i - 1, data.length));
        break;
      }
    }
    page.push(data[i]);
  }


  //mettre 12 à la place de 2 au dessus

  ////////// createElement pagination ///////////

/* Creating a button for each page. */


  for (let j = 0; j < pagination.length; j++) {
    const btn = document.createElement("button");
    btn.className = "numPage";
    btn.textContent = j + 1;
    document.querySelector(".pgn").appendChild(btn);   

  }
  
  ////////// affichage de la premiere page de base ///////////////

  display(pagination[0], admin);

  /////////// affichage de la page correspondante ///////////////

  
  document.querySelector(".pgn").addEventListener("click", (e) => {  
    let p = e.target.textContent - 1;  
    let page_number = document.querySelector('.pgn').querySelector('.numPage')
    console.log(page_number);

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
                            <p id="parent1" class="get" data-id="${perso[0].parentSo1}">Pere : ${perso[0].parentId1}</p>
                            <p id="parent2" class="get" data-id="${perso[0].parentSo2}"> Mere : ${perso[0].parentId2}</p>
                            <p id="enfant1" class="get" data-id="${perso[0].enfantSo1}"> Enfant 1 : ${perso[0].enfantId1}</p>
                            <p id="enfant2" class="get" data-id="${perso[0].enfantSo2}"> Enfant 2 : ${perso[0].enfantId2}</p>
                            <p id="enfant3" class="get" data-id="${perso[0].enfantSo3}"> Enfant 3 : ${perso[0].enfantId3}</p>
                            <p id="enfant4" class="get" data-id="${perso[0].enfantSo4}"> Enfant 4 : ${perso[0].enfantId4}</p>
                            <p id="enfant5" class="get" data-id="${perso[0].enfantSo5}"> Enfant 5 : ${perso[0].enfantId5}</p>
                            <p id="enfant6" class="get" data-id="${perso[0].enfantSo6}"> Enfant 6 : ${perso[0].enfantId6}</p>
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

                    if(document.querySelector('#parent1').textContent===" Pere : "){
                      document.querySelector('#parent1').style.display='none'
                    }
                    if(document.querySelector('#parent2').textContent===" Mere : "){
                      document.querySelector('#parent2').style.display='none'
                    }
                    if(document.querySelector('#enfant1').textContent===" Enfant 1 : "){
                      document.querySelector('#enfant1').style.display='none'
                    }
                    if(document.querySelector('#enfant2').textContent===" Enfant 2 : "){
                      document.querySelector('#enfant2').style.display='none'
                    }
                    if(document.querySelector('#enfant3').textContent===" Enfant 3 : "){
                      document.querySelector('#enfant3').style.display='none'
                    }
                    if(document.querySelector('#enfant4').textContent===" Enfant 4 : "){
                      document.querySelector('#enfant4').style.display='none'
                    }
                    if(document.querySelector('#enfant5').textContent===" Enfant 5 : "){
                      document.querySelector('#enfant5').style.display='none'
                    }
                    if(document.querySelector('#enfant6').textContent===" Enfant 6 : "){
                      document.querySelector('#enfant6').style.display='none'
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
  
  if(e.target.getAttribute("data-id")===""){
    return
  }
   else if (e.target.className === "get") {
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
                            <div class="parent"
                            <p id="parent1">${perso[0].parentId1}</p>
                            <p id="parent21">${perso[0].parentSo1}</p>
                            </div>
                          </div>
                          <div class='imgBig'>
                            <img class='bigImg' src="${perso[0].photo}" alt='photo personne'/>
                          </div>
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

                    if(document.querySelector('#parent1').textContent===" Pere : "){
                      document.querySelector('#parent1').style.display='none'
                    }
                    if(document.querySelector('#parent2').textContent===" Mere : "){
                      document.querySelector('#parent2').style.display='none'
                    }
                    if(document.querySelector('#enfant1').textContent===" Enfant 1 : "){
                      document.querySelector('#enfant1').style.display='none'
                    }
                    if(document.querySelector('#enfant2').textContent===" Enfant 2 : "){
                      document.querySelector('#enfant2').style.display='none'
                    }
                    if(document.querySelector('#enfant3').textContent===" Enfant 3 : "){
                      document.querySelector('#enfant3').style.display='none'
                    }
                    if(document.querySelector('#enfant4').textContent===" Enfant 4 : "){
                      document.querySelector('#enfant4').style.display='none'
                    }
                    if(document.querySelector('#enfant5').textContent===" Enfant 5 : "){
                      document.querySelector('#enfant5').style.display='none'
                    }
                    if(document.querySelector('#enfant6').textContent===" Enfant 6 : "){
                      document.querySelector('#enfant6').style.display='none'
                    }
    }
  }
  if (e.target.textContent == "retour") {
    document.querySelector(".fiches").style.display = "grid";
    document.querySelector(".perso").style.display = "none";
  }
 
})







////////// affichage de la page correspondante ///////////////


document.querySelector(".pagination").addEventListener("click", (e) => {  
  let p = e.target.textContent - 1;  
  let page_number = document.querySelector('.pagination').querySelector('.pagi')
  console.log(page_number);

  display(pagination[p], admin);
});

// mémoire pagination///////

//let currentpage = (de base 1, injecté avec le boutton)

// ensuite on change la valeur de currentpage avec en cliquant sur le bouton de la page. 
// si currentpage est supérieur ou égale à 4, on supprime les deux avant et les deux après

//for (let i = 0; i < pagination.length; i++) {
//   if (i == currentpage - 1) {
//     page_number[i].style.opacity = "1.0";
// } else if (i == current_page - 2 || i == current_page - 3 || i == current_page +2 || i == current_page +3){
//   page_number[i].style.opacity = "0.5";
// }
// else {
//     page_number[i].style.display = "none";
// }
// let currentpage = 1   currentpage = e.target.textContent

// let pagi = document.querySelector('.pagi')
// pagi.innerHTML += "<span class='clickPageNumber'>" + j + "</span>";