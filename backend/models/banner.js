const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'Admin',
        required : true
    },
    title:{
        type:String
    },
    images:[{
        image:{
            type:String,
            return:true
        }
    }],
    description:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:false
    },
    start_date:{
        type:Date,
        default:Date.now()
    },
    end_date:{
        stype:Date
    }
},{timestamps:true});

module.exports = mongoose.model('Banners',bannerSchema);