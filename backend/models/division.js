const mongoose = require('mongoose');
const divisionSchema = new mongoose.Schema({
    profile_id :{
        type:mongoose.Schema.ObjectId,
        ref:'WorkerProfile',
        required:true
    },
    division_name :{
        type:String,
        required:true
    },
    division_name_bn :{
        type:String,
    },
    division_url :{
        type:String,
    }
},{timestamps:true});

module.exports = mongoose.model('Division',divisionSchema);