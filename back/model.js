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
    type: String,
    required: true,
  },
  description:{
    type: String
  },
  enfantId1:{
    type: String
  },
  enfantId2:{
    type: String
  },
  enfantId3:{
    type: String
  },
  enfantId4:{
    type: String
  },
  enfantId5:{
    type: String
  },
  enfantId6:{
    type: String
  },
  parentId1:{
    type: String
  },
  parentId2:{
    type: String
  },
  enfantSo1:{
    type: String
  },
  enfantSo2:{
    type: String
  },
  enfantSo3:{
    type: String
  },
  enfantSo4:{
    type: String
  },
  enfantSo5:{
    type: String
  },
  enfantSo6:{
    type: String
  },
  parentSo1:{
    type: String
  },
  parentSo2:{
    type: String
  }
});



const arbre = mongoose.model("arbre", ficheSchema);

module.exports = arbre;