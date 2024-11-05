const  mongoose  = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:true
  },
  booking: { 
    type:mongoose.Schema.ObjectId,
     ref: 'Booking', 
     required: true 
    },
  rating: { 
      type: Number,
      required: true,
      min: 1,
      max: 5 
    },
  comment: { 
     type: String,
     required: true
     }
},{timestamps:true});

module.exports = mongoose.model('Review', reviewSchema);

