const mongoose = require("mongoose")
const Pen = require("../models/pens")

const userSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true, required: true},
        password: {type: String, required: true}
        // posts: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: "Pen"
        //     }
        // ]
        //add reference to posts, easier to loop through 
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User
