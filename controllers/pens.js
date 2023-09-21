const express = require("express")
const router = express.Router()
const Pen = require("../models/pens")
const User = require("../models/pensuser")
const isAuthenticated = (request, response, next) => {
    if (request.session.currentUser) {
      return next()
    } else {
      response.redirect("/user/login")
    }
  }

// Index Route
router.get('/', async (request, response) => {
    const foundEntries = await Pen.find()
    response.render("index.ejs", {
        pens: foundEntries
    })
})

// New Route
router.get("/new", isAuthenticated, (request, response) => {
    response.render("new.ejs",{
        user: request.session.currentUser
    })
})

// Create Route
router.post("/", async (request, response) => {
    try {
        request.body.author = request.session.currentUser._id
        const newEntry = await Pen.create(request.body)
        response.redirect("/pens")
    } catch (err) {
        console.log(err)
    }
})

// Show Route
router.get("/:id", async (request, response) => {
    const oneEntry = await Pen.findById(request.params.id)
    response.render("show.ejs", {
        pens: oneEntry
    })
})

// Edit Route
router.get("/:id/edit", async (request, response) => {
    const foundEntry = await Pen.findById(request.params.id)
    response.render("edit.ejs", {
        entry: foundEntry
    })
})

// Update Route
router.put("/:id", async (request, response) => {
    const updatedEntry = await Pen.findByIdAndUpdate(request.params.id, request.body, { new: true })
    console.log(updatedEntry)
    response.redirect(`/pens/${request.params.id}`)
})

// Delete Route
router.delete("/:id", async (request, response) => {
    const entryToDel = await Pen.findByIdAndDelete(request.params.id)
    response.redirect("/pens")
})






module.exports = router