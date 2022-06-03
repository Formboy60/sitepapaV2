const mongoose = require("mongoose");

const ficheSchema = new mongoose.Schema({

  naissance: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  id:{
    type: String,
    required: true,
  },
  photo:{
    type: String
  },
  ville:{
    type: String
  },
  description:{
    type: String
  }
});



const arbre = mongoose.model("arbre", ficheSchema);

module.exports = arbre;