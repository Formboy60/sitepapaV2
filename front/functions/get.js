let data = [];

/**
 * It fetches data from a server and then calls the pagination function.
 * @param admin - boolean
 */
export function get(admin) {
  fetch("https://murmuring-peak-73024.herokuapp.com/projet")
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
          <img class='minImg' src="${art.photo}" alt='photo ${art.nom} ${art.prenom}'/>
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
    if (i % 12 == 0 && i != 0) {
      pagination.push(page);
      page = [];
    } else {
      if (12 > data.length - 12 * pagination.length) {
        pagination.push(data.slice(i - 1, data.length))
        break
      } else if (12 >= (data.length - 1) - 12 * pagination.length) {
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
  const searchBar3 = document.querySelector(".ville");

  /* Listening for a keyup event on the search bar. When a keyup event is detected, it takes the value of
  the search bar and makes it lowercase. Then it filters the data array and returns the data that
  includes the input. If the search bar is empty, it displays the first page of the pagination.
  Otherwise, it displays the filtered data. */
  
  let test = []
  
  searchBar.addEventListener("keyup", () => {
    let input = searchBar.value;
    input = input.toLowerCase();
    if(searchBar2.value !=="" || searchBar3.value !==""){
      const filter = test.filter((hub) => {
        return hub.nom.toLowerCase().includes(input);
      });
      test = filter
      display(filter, admin);
    } else {
    let filter = data.filter((hub) => {
      return hub.nom.toLowerCase().includes(input);
    });
    test = filter
    if (searchBar.value == "" && searchBar2.value == "" && searchBar3.value == "") {
      display(pagination[0], admin);
    } else {
      display(filter, admin);
    }}
  });

  searchBar2.addEventListener("keyup", () => {
    let input = searchBar2.value;
    input = input.toLowerCase();
    if(searchBar.value !=="" || searchBar3.value !==""){
      const filter = test.filter((hub) => {
        return hub.prenom.toLowerCase().includes(input);
      });
      test = filter
      display(filter, admin);
    } else {
    const filter = data.filter((hub) => {
      return hub.prenom.toLowerCase().includes(input);
    });
    test = filter
    if (searchBar.value == "" && searchBar2.value == "" && searchBar3.value == "") {
      display(pagination[0], admin);
    } else {
      display(filter, admin);
    }}
  });


  searchBar3.addEventListener("keyup", () => {
    let input = searchBar3.value;
    input = input.toLowerCase();
    if(searchBar.value !=="" || searchBar2.value !==""){
      const filter = test.filter((hub) => {
        return hub.ville.toLowerCase().includes(input);
      });
      test = filter
      display(filter, admin);
    } else{
    const filter = data.filter((hub) => {
      return hub.ville.toLowerCase().includes(input);
    })
    test = filter
    if (searchBar.value == "" && searchBar2.value == "" && searchBar3.value == "") {
      display(pagination[0], admin);
    } else {
      display(filter, admin);
    }}
  });

  document.querySelector('.sosa').addEventListener("keyup", () => {
    let input = document.querySelector('.sosa').value
    input = input.toLowerCase()
    const filter = data.filter((hub) => {
      return hub.id.toLowerCase().includes(input)
    })
    if (document.querySelector('.sosa').value == "") {
      display(pagination[0], admin);
    } else {
      display(filter, admin);
    }
  })

  document.querySelector('.erase').addEventListener('click', () =>{
    document.querySelector('.nom').value = ""
    document.querySelector('.prenom').value = ""
    document.querySelector('.ville').value = ""
    display(pagination[0])
  })

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
        `https://murmuring-peak-73024.herokuapp.com/projet/${e.target.parentNode.getAttribute("data-id")}`
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
                            <img class='bigImg' src="${perso[0].photo}" alt='photo ${perso[0].nom} ${perso[0].prenom}'/>
                          </div>
                        </div>
                        <div class="bigLiens">
                        <div class="bigParents">
                        <p id="parent1" class="get a" data-id="${perso[0].parentSo1}"> Père : <span class="np1 a" data-id="${perso[0].parentSo1}">${perso[0].parentId1}<span></p>
                        <p id="parent2" class="get a" data-id="${perso[0].parentSo2}"> Mère : <span class="np2 a" data-id="${perso[0].parentSo2}">${perso[0].parentId2}<span></p>
                        </div>
                        <div class="bigConjoints">
                          <p id="conjoint1" class="get a" data-id="${perso[0].conjointSo1}"> Conjoint 1 : <span class="nc1 a" data-id="${perso[0].conjointSo1}">${perso[0].conjointId1}<span></p>
                          <p id="conjoint2" class="get a" data-id="${perso[0].conjointSo2}"> Conjoint 2 : <span class="nc2 a" data-id="${perso[0].conjointSo2}">${perso[0].conjointId2}<span></p>
                          <p id="conjoint3" class="get a" data-id="${perso[0].conjointSo3}"> Conjoint 3 : <span class="nc3 a" data-id="${perso[0].conjointSo3}">${perso[0].conjointId3}<span></p>
                        </div>
                          <div class="bigEnfants">
                            <p id="enfant1" class="get a" data-id="${perso[0].enfantSo1}"> Enfant 1 : <span class="ne1 a" data-id="${perso[0].enfantSo1}">${perso[0].enfantId1}<span></p>
                            <p id="enfant2" class="get a" data-id="${perso[0].enfantSo2}"> Enfant 2 : <span class="ne2 a" data-id="${perso[0].enfantSo2}">${perso[0].enfantId2}<span></p>
                            <p id="enfant3" class="get a" data-id="${perso[0].enfantSo3}"> Enfant 3 : <span class="ne3 a"data-id="${perso[0].enfantSo3}">${perso[0].enfantId3}<span></p>
                            <p id="enfant4" class="get a" data-id="${perso[0].enfantSo4}"> Enfant 4 : <span class="ne4 a" data-id="${perso[0].enfantSo4}">${perso[0].enfantId4}<span></p>
                            <p id="enfant5" class="get a" data-id="${perso[0].enfantSo5}"> Enfant 5 : <span class="ne5 a" data-id="${perso[0].enfantSo5}">${perso[0].enfantId5}<span></p>
                            <p id="enfant6" class="get a" data-id="${perso[0].enfantSo6}"> Enfant 6 : <span class="ne6 a" data-id="${perso[0].enfantSo6}">${perso[0].enfantId6}<span></p>
                            <p id="enfant7" class="get a" data-id="${perso[0].enfantSo7}"> Enfant 7 : <span class="ne7 a" data-id="${perso[0].enfantSo7}">${perso[0].enfantId7}<span></p>
                            <p id="enfant8" class="get a" data-id="${perso[0].enfantSo8}"> Enfant 8 : <span class="ne8 a" data-id="${perso[0].enfantSo8}">${perso[0].enfantId8}<span></p>
                            <p id="enfant9" class="get a" data-id="${perso[0].enfantSo9}"> Enfant 9 : <span class="ne9 a" data-id="${perso[0].enfantSo9}">${perso[0].enfantId9}<span></p>
                            <p id="enfant10" class="get a" data-id="${perso[0].enfantSo10}"> Enfant 10 : <span class="ne10 a" data-id="${perso[0].enfantSo10}">${perso[0].enfantId10}<span></p>
                            <p id="enfant11" class="get a" data-id="${perso[0].enfantSo11}"> Enfant 11 : <span class="ne11 a"data-id="${perso[0].enfantSo11}">${perso[0].enfantId11}<span></p>
                            <p id="enfant12" class="get a" data-id="${perso[0].enfantSo12}"> Enfant 12 : <span class="ne12 a" data-id="${perso[0].enfantSo12}">${perso[0].enfantId12}<span></p>
                            <p id="enfant13" class="get a" data-id="${perso[0].enfantSo13}"> Enfant 13 : <span class="ne13 a" data-id="${perso[0].enfantSo13}">${perso[0].enfantId13}<span></p>
                            <p id="enfant14" class="get a" data-id="${perso[0].enfantSo14}"> Enfant 14 : <span class="ne14 a" data-id="${perso[0].enfantSo14}">${perso[0].enfantId14}<span></p>
                            <p id="enfant15" class="get a" data-id="${perso[0].enfantSo15}"> Enfant 15 : <span class="ne15 a" data-id="${perso[0].enfantSo15}">${perso[0].enfantId15}<span></p>
                          </div>
                        </div>
                        <div class='bas'>
                          <p id="decriptionBig" contenteditable=${admin}>${perso[0].description}</p>
                          <div class='arbre'>
                            <img class='mini' src="${perso[0].photo2}" alt='arbre de ${perso[0].nom} ${perso[0].prenom}'/>
                            <p class='minihover'>Passez le pointeur pour agrandir l'image</p>
                          </div>
                        </div>
                      </div>
                      <div class="but">
                        <button class="sup sup1" id='sup1'>supprimer</button>
                        <button class="sup sup2" id='sup2'>Confirmer la suppression ?</button>
                        <button class="edit">editer</button>
                      </div>
                      <button class="retour">retour</button>
                    </div> `;

      if (document.querySelector('#parent1').textContent === " Père : ") {
        document.querySelector('#parent1').style.display = 'none'
      }
      if (document.querySelector('#parent2').textContent === " Mère : ") {
        document.querySelector('#parent2').style.display = 'none'
      }
      if (document.querySelector('.mini').src == 'http://127.0.0.1:5501/front/back-office/gest/adminGest.html'){
        document.querySelector('.arbre').style.display = 'none'
      }
      

      for(let i = 1 ; i<=15 ; i++){
        if (document.querySelector(`#enfant${[i]}`).textContent === ` Enfant ${[i]} : `) {
          document.querySelector(`#enfant${[i]}`).style.display = 'none'
        }
      }
 
      for(let i = 1 ; i<=3 ; i++){
        if (document.querySelector(`#conjoint${[i]}`).textContent === ` Conjoint ${[i]} : `) {
          document.querySelector(`#conjoint${[i]}`).style.display = 'none'
        }
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
        `https://murmuring-peak-73024.herokuapp.com/projet/parent/${e.target.getAttribute("data-id")}`
      )
      .then((response) => response.json())
      .then((res) => {
        perso = res;
        console.log(res);
        if (localStorage.getItem('token')) {
          return affiche(perso, true);
        }
        affiche(perso)
        
      });
      
      function reload() {
        location.reload()
      }


    function affiche(perso, admin) {
      if(perso.length == 0){
        document.querySelector(
          ".perso"
        ).innerHTML = `Aucun lien trouvé. Patientez un instant`
        setTimeout(reload, 1000)
      }
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
            <img class='bigImg' src="${perso[0].photo}" alt='photo ${perso[0].nom} ${perso[0].prenom}'/>
          </div>
        </div>
        <div class="bigLiens">
          <div class="bigParents">
            <p id="parent1" class="get a" data-id="${perso[0].parentSo1}"> Père : <span class="np1 a" data-id="${perso[0].parentSo1}">${perso[0].parentId1}<span></p>
            <p id="parent2" class="get a" data-id="${perso[0].parentSo2}"> Mère : <span class="np2 a" data-id="${perso[0].parentSo2}">${perso[0].parentId2}<span></p>
          </div>
          <div class="bigConjoints">
            <p id="conjoint1" class="get a" data-id="${perso[0].conjointSo1}"> Conjoint 1 : <span class="nc1 a" data-id="${perso[0].conjointSo1}">${perso[0].conjointId1}<span></p>
            <p id="conjoint2" class="get a" data-id="${perso[0].conjointSo2}"> Conjoint 2 : <span class="nc2 a" data-id="${perso[0].conjointSo2}">${perso[0].conjointId2}<span></p>
            <p id="conjoint3" class="get a" data-id="${perso[0].conjointSo3}"> Conjoint 3 : <span class="nc3 a" data-id="${perso[0].conjointSo3}">${perso[0].conjointId3}<span></p>
          </div>
          <div class="bigEnfants">
            <p id="enfant1" class="get a" data-id="${perso[0].enfantSo1}"> Enfant 1 : <span class="ne1 a" data-id="${perso[0].enfantSo1}">${perso[0].enfantId1}<span></p>
            <p id="enfant2" class="get a" data-id="${perso[0].enfantSo2}"> Enfant 2 : <span class="ne2 a" data-id="${perso[0].enfantSo2}">${perso[0].enfantId2}<span></p>
            <p id="enfant3" class="get a" data-id="${perso[0].enfantSo3}"> Enfant 3 : <span class="ne3 a"data-id="${perso[0].enfantSo3}">${perso[0].enfantId3}<span></p>
            <p id="enfant4" class="get a" data-id="${perso[0].enfantSo4}"> Enfant 4 : <span class="ne4 a" data-id="${perso[0].enfantSo4}">${perso[0].enfantId4}<span></p>
            <p id="enfant5" class="get a" data-id="${perso[0].enfantSo5}"> Enfant 5 : <span class="ne5 a" data-id="${perso[0].enfantSo5}">${perso[0].enfantId5}<span></p>
            <p id="enfant6" class="get a" data-id="${perso[0].enfantSo6}"> Enfant 6 : <span class="ne6 a" data-id="${perso[0].enfantSo6}">${perso[0].enfantId6}<span></p>
            <p id="enfant7" class="get a" data-id="${perso[0].enfantSo7}"> Enfant 7 : <span class="ne7 a" data-id="${perso[0].enfantSo7}">${perso[0].enfantId7}<span></p>
            <p id="enfant8" class="get a" data-id="${perso[0].enfantSo8}"> Enfant 8 : <span class="ne8 a" data-id="${perso[0].enfantSo8}">${perso[0].enfantId8}<span></p>
            <p id="enfant9" class="get a" data-id="${perso[0].enfantSo9}"> Enfant 9 : <span class="ne9 a" data-id="${perso[0].enfantSo9}">${perso[0].enfantId9}<span></p>
            <p id="enfant10" class="get a" data-id="${perso[0].enfantSo10}"> Enfant 10 : <span class="ne10 a" data-id="${perso[0].enfantSo10}">${perso[0].enfantId10}<span></p>
            <p id="enfant11" class="get a" data-id="${perso[0].enfantSo11}"> Enfant 11 : <span class="ne11 a"data-id="${perso[0].enfantSo11}">${perso[0].enfantId11}<span></p>
            <p id="enfant12" class="get a" data-id="${perso[0].enfantSo12}"> Enfant 12 : <span class="ne12 a" data-id="${perso[0].enfantSo12}">${perso[0].enfantId12}<span></p>
            <p id="enfant13" class="get a" data-id="${perso[0].enfantSo13}"> Enfant 13 : <span class="ne13 a" data-id="${perso[0].enfantSo13}">${perso[0].enfantId13}<span></p>
            <p id="enfant14" class="get a" data-id="${perso[0].enfantSo14}"> Enfant 14 : <span class="ne14 a" data-id="${perso[0].enfantSo14}">${perso[0].enfantId14}<span></p>
            <p id="enfant15" class="get a" data-id="${perso[0].enfantSo15}"> Enfant 15 : <span class="ne15 a" data-id="${perso[0].enfantSo15}">${perso[0].enfantId15}<span></p>
          </div>
        </div>
        <div class='bas'>
          <p id="decriptionBig" contenteditable=${admin}>${perso[0].description}</p>
            <div class='arbre'>
              <img class='mini' src="${perso[0].photo2}" alt='arbre de ${perso[0].nom} ${perso[0].prenom}'/>
              <p class='minihover'>Passez le pointeur pour agrandir l'image</p>
            </div>
        </div>
      </div>
      <div class="but">
        <button class="sup">supprimer</button>
        <button class="sup sup2">Confirmer la suppression</button>
        <button class="edit">editer</button>
      </div>
      <button class="retour">retour</button>
    </div> `;

        if (document.querySelector('#parent1').textContent === " Père : ") {
        document.querySelector('#parent1').style.display = 'none'
      }
      if (document.querySelector('#parent2').textContent === " Mère : ") {
        document.querySelector('#parent2').style.display = 'none'
      }
      if (document.querySelector('.mini').src == 'http://127.0.0.1:5501/front/back-office/gest/adminGest.html'){
        document.querySelector('.arbre').style.display = 'none'
      }

      for(let i = 1 ; i<=15 ; i++){
        if (document.querySelector(`#enfant${[i]}`).textContent === ` Enfant ${[i]} : `) {
          document.querySelector(`#enfant${[i]}`).style.display = 'none'
        }
      }
 
      for(let i = 1 ; i<=3 ; i++){
        if (document.querySelector(`#conjoint${[i]}`).textContent === ` Conjoint ${[i]} : `) {
          document.querySelector(`#conjoint${[i]}`).style.display = 'none'
        }
      }
    }
  }
  if (e.target.textContent == "retour") {
    document.querySelector(".fiches").style.display = "grid";
    document.querySelector(".perso").style.display = "none";
  }

})





