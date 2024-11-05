const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true  
    },
    video:{
        type:String,
        required:true  
    },
    coverimage:{
        type:String,
        default:'https://i.ibb.co/KbSwcWJ/image-01-1.jpg'  
    }
},{timestamps:true});

module.exports = mongoose.model('Video',VideoSchema);