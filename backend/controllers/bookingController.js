const Booking = require("../models/booking");
const WorkerProfile = require("../models/workerProfile");
const Service = require("../models/service");
const PaymentModel = require("../models/payment");
const NewBooking = require("../models/newbooking");
const User = require("../models/user");
// List all bookings
exports.listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate(
      "workers.user services services.service reviews.user user paymentid"
    );
    res.status(201).json({
      flag: true,
      message: "booking getting successfully!",
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

//get new booking list
exports.listNewBookings = async (req, res) => {
  try {
    const bookings = await NewBooking.find().populate(
      "workers.user services services.service reviews.user user paymentid"
    );
    res.status(201).json({
      flag: true,
      message: "booking getting successfully!",
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "user workers.user services services.service reviews.user paymentid"
    );
    if (!booking) {
      return res.status(400).json({
        flag: false,
        message: "booking is not found!",
      });
    }
    ///remove new booking
    if (req.user.userType == "admin") {
      const newbooking = await NewBooking.findOne({ bookingId: req.params.id });
      if (newbooking) {
        await NewBooking.findByIdAndDelete(newbooking._id);
      }
    }
    res.status(201).json({
      flag: true,
      message: "booking getting successfully!",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// get booking by user id
exports.getBookingByUserId = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userid }).populate(
      "user workers services services.service reviews.user paymentid"
    );
    if (!bookings) {
      return res.status(400).json({
        flag: false,
        message: "booking user is not found!",
      });
    }
    res.status(201).json({
      flag: true,
      message: "booking getting successfully!",
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// get booking by worker id
exports.getBookingByWorkerId = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate(
      "user workers.user services services.service reviews.user paymentid"
    );
    const workerBookingList = []
    if (bookings.length > 0) {
      bookings.forEach(booking => {
         if(booking.workers.length > 0){
              const find_worker = booking.workers.find((i)=>i.user._id === req.params.userid);
              if(find_worker){
                workerBookingList.push(booking) 
              }
         }
     });
    }
    res.status(201).json({
      flag: true,
      message: "booking getting successfully!",
      workerBookingList,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Update a booking payment status
exports.updateBookingPaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body; //['Pending', 'Confirmed', 'Completed', 'Cancelled']
    if (!paymentStatus) {
      return res.status(400).json({
        flag: false,
        message: "payment_status is required!",
      });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { is_payment_status: paymentStatus },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!booking) {
      return res.status(400).json({
        flag: false,
        message: "booking update fail!",
      });
    }
    await NewBooking.create({
      bookingId: booking._id,
      username: booking?.username || null,
      user: booking?.user,
      services: booking?.services,
      area: booking?.area,
      address: booking?.address,
      ratings: booking?.ratings,
      state: booking?.state,
      city: booking?.city,
      phone: booking?.phone,
      paymentid: booking?.paymentid,
      advance_amount: booking?.advance_amount,
      total_amount: booking?.total_amount,
      we_will_get_payment: booking?.we_will_get_payment,
      is_payment_status: booking?.is_payment_status,
      workers: booking?.workers,
      reviews: booking?.reviews,
    });

    const bookings = await Booking.find().populate(
      "user workers.user services services.service reviews.user paymentid"
    );
    res.status(201).json({
      flag: true,
      message: "booking status update successfully!",
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// get a booking payment status
exports.getBookingPaymentStatus = async (req, res) => {
  try {
    const bookings = await Booking.find({is_payment_status:req.params.status}).populate(
      "user workers.user services services.service reviews.user paymentid"
    );
    res.status(201).json({
      flag: true,
      message: "booking status update successfully!",
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};


//update booking worker
exports.updateBookingWorker = async (req, res) => {
  try {
    const { workerId } = req.body;
    if (!workerId) {
      return res.status(400).json({
        flag: false,
        message: "worker is required!",
      });
    }
    const booking = await Booking.findById(req.params.id);

    if (workerId.length > 0) {
      booking.workers = [];
      workerId.forEach(async (item) => {
        const find_worker = booking.workers.find(
          (i) => i.user.toString() === item
        );
        if (!find_worker) {
          booking.workers.push({ user: item });
          const worker_profile = await WorkerProfile.findOne({ user: item });
          worker_profile.is_free = "NO";
          worker_profile.save({ validateBeforeSave: false });
        }
      });
      booking.save({ validateBeforeSave: false });
    }

    const bookings = await Booking.find().populate(
      "user workers.user services services.service reviews.user paymentid"
    );
    res.status(201).json({
      flag: true,
      message: "booking worker update successfully!",
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(400).json({
        flag: false,
        message: "booking delete fails!",
      });
    }
    res.status(201).json({
      flag: true,
      message: "booking delete successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};


///get booking payment id
exports.getBookingByPaymentId = async(req,res)=>{
   try{
    const booking = await Booking.findOne({paymentid:req.params.pyid}).populate(
      "user workers.user services services.service reviews.user paymentid"
    );
    if (!booking) {
      return res.status(400).json({
        flag: false,
        message: "booking is not found!",
      });
    }
    res.status(201).json({
      flag: true,
      message: "booking getting successfully!",
      booking,
    });
   }
   catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
}


///get booking payment id
exports.deleteBookingByPaymentId = async(req,res)=>{
  try{
   const bookingpayment = await PaymentModel.findByIdAndDelete(req.params.pyid);
   console.log('r',req.params.pyid)
   if (!bookingpayment) {
     return res.status(400).json({
       flag: false,
       message: "booking is not found!",
     });
   }
   const booking = await Booking.findOne({paymentid:req.params.pyid});
   if (booking) {
      await Booking.findByIdAndDelete(booking._id);    
   }
   res.status(201).json({
     flag: true,
     message: "delete successfully!",
   });
  }
  catch (error) {
   return res.status(400).json({
     flag: false,
     message: error.message,
   });
 }
}