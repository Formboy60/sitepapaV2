const express = require("express");
const ficheModel = require("./model");
const app = express();
let cors = require('cors')
app.use(cors())
app.use(express.json())

const {
  isUser
} = require('./middleware/middle.js')



/////////////// route POST /////////////////

/* A post request to the server. */
app.post('/projet/arbres', isUser, (req, res) => {

  const fiche = new ficheModel({
    ...req.body,
  });

  fiche.save()
    .then(() => res.status(201).json({
      message: 'Données enregistrées !'
    }))
    .catch(() => res.status(400).json({
      message: 'Erreur de transmission'
    })); 
});

/////////////////// route GET /////////////////

/* A GET request to the /projet/ route. It is using the ficheModel to find all the documents in the
database. It is then sending the response to the client. */
app.get("/projet/", async (request, response) => {
  const fiche = await ficheModel.find({});

  try {
    response.send(fiche);
  } catch (error) {
    response.status(500).send(error);
  }
});

////////////////// route get ID ////////////////

/* A GET request to the /projet/:id route. It is using the ficheModel to find one document in the
database. It is then sending the response to the client. */
app.get("/projet/:id", async (request, response) => {
  const fiche = await ficheModel.find({
    _id: request.params.id
  });

  try {
    response.send(fiche);
  } catch (error) {
    response.status(500).send(error);
  }
});

/* A GET request to the /projet/parent/:id route. It is using the ficheModel to find one document
in the database. It is then sending the response to the client. */
app.get("/projet/parent/:id", async (request, response) => {
  const fiche = await ficheModel.find({
    id: request.params.id
  });

  try {
    response.send(fiche);
  } catch (error) {
    response.status(500).send(error);
  }
});



//////////////// route PUT //////////////////////

/* A PUT request to the /projet/:id route. It is using the ficheModel to find all the documents in the
database. It is then sending the response to the client. */
app.put('/projet/:id', isUser, (req, res) => {

  ficheModel.updateOne({
      _id: req.params.id
    }, {
      ...req.body,
      _id: req.params.id
    })
    .then(() => res.status(201).json({
      message: 'Données modifié !'
    }))
    .catch(() => res.status(400).json({
      message: 'Echec de la modification'
    })); 
  });
  
  
  ///////////////// route DELETE //////////////////
  
  /* Deleting the data from the database. */
  app.delete('/projet/:id', isUser, (req, res) => {
    ficheModel.deleteOne({
        _id: req.params.id
      })
      .then(() => res.status(200).json({
        message: 'Données supprimées'
      }))
      .catch(error => {
        res.status(400).json({
          message: error
        })
      });
  });
  
module.exports = app;