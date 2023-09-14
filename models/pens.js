const mongoose = require("mongoose")
const penSchema = new mongoose.Schema(
    {
    name: { type: String },
    email: { type: String },
    //date:
    entryTitle: {type: String, required: true},
    entry: { type: String, required: true},
    img: {type:String}
    },
    {
        timestamps: true
    }
)

const Pen = mongoose.model("Pen", penSchema)

module.exports=Pen