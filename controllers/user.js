const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const Pen = require("../models/pens")
const User = require("../models/pensuser")

//New User Sign Up Form
router.get("/", (request, response) => {
    response.render("newUser.ejs")
})


// New User Sign Up Form POST
router.post("/", async (request, response) => {
    try {
        request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10))
        const newUser = await User.create(request.body)
        request.session.currentUser = newUser
        // console.log(newUser)
        response.redirect("/pens")
    }
    catch (err) {
        console.log(err)
        response.status(500).send("error, please try again")
    }
})


// Login User Route
router.get("/login", (request, response) => {
    response.render("login.ejs")
})
// Login User POST 
router.post("/login", async (request, response) => {
    try {
        const foundUser = await User.findOne({ username: request.body.username })
        if (foundUser) {
            const isAMatch = bcrypt.compareSync(request.body.password, foundUser.password)
            if (isAMatch) {
                request.session.currentUser = foundUser
                // console.log(request.session.currentUser.username)
                response.redirect("/pens")
            }
        }
    } catch (err) {
        console.log(err)
        response.status(500).send("Please try again")
    }
})

// Logout User Route
router.delete("/logout", (request, response) => {
    request.session.destroy(err => {
        if (err) {
            console.log(err)
        } else {
            response.redirect("/user/login")
        }
    })
})


// Custom auth middleware
// if currentUser has a session, show the profilepg
// if not, redirect to login page
const isAuthenticated = (request, response, next) => {
    if (request.session.currentUser) {
      return next()
    } else {
      response.redirect("/user/login")
    }
  }

router.get("/profile",isAuthenticated, (request,response)=>{
    // console.log(request.session.currentUser)
    response.render("profilepg.ejs",{
        user: request.session.currentUser
    })
})

module.exports = router


