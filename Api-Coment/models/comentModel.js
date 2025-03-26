const mongoose = require('mongoose');

const comentSchema = new mongoose.Schema({
    foro_id:{type:String,required:true},
    user_id:{type:String,required:true},
    comment:{type:String, required:true},
    created_at:{type:Date,default:Date.now},
});

const Comment = mongoose.model("Foro",comentSchema);

module.exports = Comment;

