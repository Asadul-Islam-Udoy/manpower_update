const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  tran_id:{
    type:String,
    required:true
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    defalut: 'Pending', // enum: ["Pending", "Completed", "Failed"],
  },
  before_payment_id:{
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },
  paidStatus:{
    type:Boolean,
    default:false
  },
  method: {
    type: String,
 //   enum: ["Credit Card", "Debit Card", "PayPal", "Cash"],
  },
},{timestamps:true});

module.exports = mongoose.model("Payment", paymentSchema);
