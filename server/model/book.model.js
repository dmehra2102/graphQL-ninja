const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name : {type:String, required : true},
    genre : {type:String, required : true},
    authorId : {type:String, required : true},
},{
    timestamps : true,
    versionKey : false
});

module.exports = mongoose.model("Book", bookSchema);