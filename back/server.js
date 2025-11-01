const express = require('express')
const mongoose = require("mongoose")
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const Router = require("./route.js")
const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(`${process.env.MONGOOSE}`)

/* Connecting to the database. */
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



app.use(Router);
app.listen(PORT)
