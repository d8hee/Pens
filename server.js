
// IMPORTS
const express = require('express')
const app = express()
const Pen = require("./models/pens")
const methodOverride = require("method-override")

require('dotenv').config()

const PORT = process.env.PORT || 3000

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI)
const db = mongoose.connection
// optional create status messages to check mongo connection 
// db.on('error', (err) => { console.log('ERROR: ', err) })
db.on('connected', () => { console.log('mongo connected') })
db.on('disconnected', () => { console.log('mongo disconnected') })


const pensController = require("./controllers/pens")
app.use("/pens", pensController)

app.use(express.static("public"))

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})