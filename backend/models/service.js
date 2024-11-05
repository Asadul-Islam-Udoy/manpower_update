const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service_category_id: {
    type: mongoose.Schema.ObjectId,
    ref: "ServiceCategory",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }, 
  service_price:{
    type:Number,
    required:true
  },
  image:{
    type:String,
  },
  service_discount:{
       discount:{
        type:Number,
        default:0
       },
       discount_type:{
        type:String, 
       }
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews:[{
    user:{type:mongoose.Schema.ObjectId,ref:'ClientProfile'},
    comment:{type:String,required:true},
    rating:{type:Number,default:0},
    date:{
      type:Date,
      default:Date.now()
    }
  }]
},{timestamps:true});

module.exports = mongoose.model("Service", serviceSchema);
