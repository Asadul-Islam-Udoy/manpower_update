const mongoose = require('mongoose');
const NoticeSchema = new mongoose.Schema({
    header:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true  
    },
    notice_point:[],
    image:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('HomePageNotics',NoticeSchema);