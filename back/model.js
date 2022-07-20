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
    type: Number,
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
  enfantId7:{
    type: String
  },
  enfantId8:{
    type: String
  },
  enfantId9:{
    type: String
  },
  enfantId10:{
    type: String
  },
  enfantId11:{
    type: String
  },
  enfantId12:{
    type: String
  }, 
  enfantId13:{
    type: String
  },
  enfantId14:{
    type: String
  },
  enfantId15:{
    type: String
  },
  parentId1:{
    type: String
  },
  parentId2:{
    type: String
  },
  conjointId1:{
    type: String
  },
  conjointId2:{
    type: String
  },
  conjointId3:{
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
  enfantSo7:{
    type: String
  },
  enfantSo8:{
    type: String
  },
  enfantSo9:{
    type: String
  },
  enfantSo10:{
    type: String
  },
  enfantSo11:{
    type: String
  },
  enfantSo12:{
    type: String
  },
  enfantSo13:{
    type: String
  },
  enfantSo14:{
    type: String
  },
  enfantSo15:{
    type: String
  },
  parentSo1:{
    type: String
  },
  parentSo2:{
    type: String
  },
  conjointSo1:{
    type: String
  },
  conjointSo2:{
    type: String
  },
  conjointSo3:{
    type: String
  },
});



const arbre = mongoose.model("arbre", ficheSchema);

module.exports = arbre;