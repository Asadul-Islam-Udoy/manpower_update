const mongoose = require("mongoose");
const newbookingSchema = new mongoose.Schema({
 bookingId:{
    type: mongoose.Schema.ObjectId,
    ref: "Booking",
    required: true,   
 },
 user: {
  type: mongoose.Schema.ObjectId,
  ref: "User",
  required: true,
},
workers: [{
  user:{
  type: mongoose.Schema.ObjectId,
  ref: "User", //this column will be update
  }
}],
services: [
  {
    service: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
      required: true,
    },
    work_start_date: {
        type: Date,
    },
    time_schedule:{
      type:String
    },
    price:{
      type:Number,
      defalut:0 
    }
  },
],
username:{
  type:String,
  required:true
},
ratings: {
  type: Number,
  default: 0,
},
reviews:[{
  user:{type:mongoose.Schema.ObjectId,ref:'User'},
  comment:{type:String,required:true},
  rating:{type:Number,default:0}
}],
area: {
  type: String,
  required: true,
},
address: {
  type: String,
  required: true,
},
state:{
  type: String,
  required: true,
},
city:{
  type: String,
  required: true,
},
phone: {
  type: String,
  required: true,
},
others_info: {
  type: String,
  required: false,
},
advance_amount: {
  type: Number,
},
total_amount: {
  type: Number,
},
we_will_get_payment: {
  type: Number,
  default: 0,
},
paymentid:{
 type:mongoose.Schema.ObjectId,
 ref:'Payment',
 required:true
},
is_payment_status: {
  type: String,
  default: "Pending",
}, //['Pending', 'Confirmed', 'Completed', 'Cancelled']
});

module.exports = mongoose.model("NewBooking", newbookingSchema);
