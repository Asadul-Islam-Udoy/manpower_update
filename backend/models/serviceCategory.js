const mongoose = require('mongoose');
const serviceCategorySchema = new mongoose.Schema({
    parentId:{
        type:String,
        default:null
    },
    category_name:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    description:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('ServiceCategory',serviceCategorySchema);