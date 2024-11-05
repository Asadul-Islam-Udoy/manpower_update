const mongoose = require('mongoose');
const otherAddressSchema = new mongoose.Schema({
    upazila_id :{
        type:mongoose.Schema.ObjectId,
        ref:'Upazila',
        required:true
    },
    otherAddress_name:{
     type: String,
     required:true
    },
    otherAddress_name_bn :{
        type:String,
    },
    otherAddress_name_url :{
        type:String,
    }
},{timestamps:ture});

module.exports = mongoose.model('otherAddress',otherAddressSchema);