const express=require("express")
const router=express.Router()
const Pen=require("../models/pens")

// Index Route
router.get('/', async (request, response) => {
    const foundEntries = await Pen.find()
    response.render("index.ejs",{
        pens: foundEntries
    })
 })

// New Route
router.get("/new", (request, response)=>{
    response.render("new.ejs")
})

// Create Route
router.post("/", async (request,response)=>{
    try{const newEntry = await Pen.create(request.body)
    response.redirect("/pens")
    }catch(err){
        console.log(err)
    }
})

module.exports=router