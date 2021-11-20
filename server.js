const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;

//configure settings
require('dotenv').config();
// Port
const PORT = process.env.PORT || 3000

//Database
const MONGODB_URI = process.env.MONGODB_URI

//Connect to Mongo
mongoose.connect(MONGODB_URI);
//Error or success
db.on("error", (err) => console.log(err.message + " is mongod not running?"))
db.on("connected", () => console.log("mongod connected: ", MONGODB_URI))
db.on("disconnected", () => console.log("mongod disconnected"))

//middleware

//use public folder for static assets
app.use(express.static("public"))

// provides req.body 
app.use(express.urlencoded({ extended: false })) 
app.use(express.json()) //parses  only JSON 

//use method override
app.use(methodOverride("_method"))

//routes
app.get("/", (req, res) => {
    res.send("Hello World!")
  })

  //listener
  app.listen(PORT, () => console.log("express is listening on:", PORT))