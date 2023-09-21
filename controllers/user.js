const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const Pen = require("../models/pens")
const User = require("../models/pensuser.js")

router.get("/", (request,response)=>{
    response.render("newUser.ejs")
})

// // User Profile Page Route
// router.get("/profile", (request,response)=>{
//     response.render("userView.ejs")
// })


// // New User Sign Up Form
// router.get("/register", (request,response)=>{
//     response.render("newUser.ejs")
// })
// // New User Sign Up Form POST
// router.post("/", async (request,response) => {
//     request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10))
//     const newUser = await User.create(request.body)
//     request.session.currentUser = newUser
//     response.redirect("/user")
// })  

module.exports = router