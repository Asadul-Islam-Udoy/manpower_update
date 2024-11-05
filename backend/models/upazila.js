const mongoose = require('mongoose');
const upazilaSchema = new mongoose.Schema({
    profile_id :{
        type:mongoose.Schema.ObjectId,
        ref:'WorkerProfile',
        required:true
    },
    district_id :{
        type:mongoose.Schema.ObjectId,
        ref:'District',
        required:true
    },
    upazila_name:{
     type: String,
     required:true
    },
    upazila_name_bn :{
        type:String,
    },
    upazila_name_url :{
        type:String,
    },
    others_address:{
        type:String,  
    }
},{timestamps:true});

module.exports = mongoose.model('Upazila',upazilaSchema);