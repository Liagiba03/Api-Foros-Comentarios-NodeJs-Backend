const mongoose = require('mongoose');

const foroSchema = new mongoose.Schema({
    title:{type:String,required:true, unique:true},
    description:{type:String,required:false,},
    author:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    created_at:{type:Date,default:Date.now},
    last_update:{type:Date,default:Date.now},
});

const Foro = mongoose.model("Foro",foroSchema);

module.exports = Foro;
