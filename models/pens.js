const mongoose = require("mongoose")
const User = require("../models/pensuser")

const penSchema = new mongoose.Schema(
    {
        // name: String,
        //date:
        entryTitle: { type: String, required: true },
        entry: { type: String, required: true },
        author: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            // required: true
        }
    },
    {
        timestamps: true
    }
)

// const penSchema = new mongoose.Schema(
//     {
//     entryTitle: {type: String, required: true},
//     entry: { type: String, required: true},
//     private: false
//     },
//     {
//         timestamps: true
//     }
// )

const Pen = mongoose.model("Pen", penSchema)

module.exports = Pen


