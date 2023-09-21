
// IMPORTS
const express = require('express')
const app = express()
const Pen = require("./models/pens")
const User = require("./models/pensuser")
const methodOverride = require("method-override")
const session = require("express-session")
const bcrypt = require("bcrypt")
// const hashedString = bcrypt.hashSync('yourStringHere', bcrypt.genSaltSync(10))
// bcrypt.compareSync('yourGuessHere', hashedString) //returns true or false

require('dotenv').config()

const PORT = process.env.PORT || 3000

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

// CONTROLLERS 
const pensController = require("./controllers/pens")
const userController = require("./controllers/user")

// app.use for pens and user controllers
app.use("/user", userController)

app.use("/pens", pensController)

// // puts "something" on the session
// app.get("/any", (request, response) => {
//     request.session.anyProperty = "something"
//     response.redirect("/pens")
// })

// // matches if "something" exists on session 
// app.get("/retrieve", (request, response) => {
//     if (request.session.anyProperty === "something") {
//         console.log("MATCH!")
//     } else {
//         console.log("NOT a match!")
//     }
//     response.redirect("/pens")
// })

// //route to make changes on current session 
// app.get('/update', (request, response) => {
//     //any route will work
//     request.session.anyProperty = "not something"
//     response.redirect('/')
// })

// // destroy session
// app.get("/destroy", ()=>{
//     request.session.destroy(err => {
//         if(err){
//             //do something if destroying session fails
//         } else {
//             response.redirect("/pens")
//         }
//     })
// })

const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI)
const db = mongoose.connection
// optional create status messages to check mongo connection 
// db.on('error', (err) => { console.log('ERROR: ', err) })
db.on('connected', () => { console.log('mongo connected') })
db.on('disconnected', () => { console.log('mongo disconnected') })

app.use(express.static("public"))

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})