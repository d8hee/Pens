const express=require("express")
const router=express.Router()
const Pen=require("../models/pens")

// Index Route
router.get('/', (request, response) => {
    response.render("index.ejs",{
        pens: Pen
    })
 })

// New Route
router.get("/new", (request, response)=>{
    response.render("new.ejs")
})

// Create Route
router.post("/", (request,response)=>{
    response.redirect(request.body)
})

module.exports=router