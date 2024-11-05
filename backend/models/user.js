const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserSchema=new mongoose.Schema({
    phone:{
        type:String,
    },
    email:{
      type:String,
    },
    userType:{
     type:String,
     default:'client'
    },
    is_otp:{
        type:String
    },
    otp_expiresIn:{
        type:Date
    },
    is_phone_verified:{
        type:Boolean,
        default:false
    },
    is_temp:{
      type:String, 
    }
},{timestamps:true});

///create json web token
UserSchema.methods.getUserTokenMethod = function(){
    const accesstoken = jwt.sign(
      { _id: this._id },
      process.env.JWT_SECRITE_KEY,
      {
        expiresIn: "30d",
      }
    );
    const refreshtoken = jwt.sign(
      { _id: this._id },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "40d" }
    );
  
    const tokens = { accesstoken: accesstoken, refreshtoken: refreshtoken };
    return tokens;
  
  }
module.exports = mongoose.model('User',UserSchema);