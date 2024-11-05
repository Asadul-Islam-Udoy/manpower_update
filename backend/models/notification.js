const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.ObjectId, 
      ref: "User",
      required: true
      },
  newNotifiactions: [{
    user: {
      type: mongoose.Schema.ObjectId, 
      ref: "User",
      required: true
      },
      description:{
        type:String
       },
      title: { 
        type: String, 
        required: true 
       },
       details_url:{
        type:String
       },
       send_date: { 
        type: Date, 
        default:Date.now()
       },
       end_date: { 
        type: Date, 
        required: false 
       },
  }],
  seenNotifications:[{
     user: {
      type: mongoose.Schema.ObjectId, 
      ref: "User",
      required: false
      },
      title: { 
        type: String, 
        required: false
       },
       description:{
        type:String
       },
       details_url:{
        type:String
       },
       date: { 
        type: Date, 
        required: false
       },
  }],

},{timestamps:true});

module.exports = mongoose.model("Notification", notificationSchema);
