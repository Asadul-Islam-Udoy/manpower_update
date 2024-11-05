const mongoose = require('mongoose');
const districtSchema = new mongoose.Schema({
    profile_id :{
        type:mongoose.Schema.ObjectId,
        ref:'WorkerProfile',
        required:true
    },
    division_id :{
        type:mongoose.Schema.ObjectId,
        ref:'Division',
        required:true
    },
    district_name :{
        type:String,
        required:true
    },
    district_name_bn :{
        type:String,
    },
    district_url :{
        type:String,
    }
},{timestamps:true});

module.exports = mongoose.model('District',districtSchema);