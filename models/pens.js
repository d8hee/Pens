const mongoose = require("mongoose")
const penSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    email: { type: String },
    //date:
    entryTitle: {type: String, required: true},
    entry: { type: String, required: true},
    img: {type:String}
})

const Pen = mongoose.model("Pen", penSchema)