const Review = require("../models/review");
const Booking = require("../models/booking");
const Service = require("../models/service");
const WorkerProfile = require("../models/workerProfile");
const ClientProfile = require('../models/clientProfile');
// Create a new review
exports.bookingReviewController = async (req, res) => {
  try {
    const { comment, rating, serviceId, workerId } = req.body;
    const userfind = await ClientProfile.findOne({user:req.user._id});
    const option = {
      user: userfind._id,
      comment,
      rating,
      date:Date.now()
    };
    ///booking reviews
    const booking_check = await Booking.findById(req.params.bookingId);
    if (!booking_check) {
      return res.status(400).json({
        flag: false,
        message: "booking is not found",
      });
    }
    const reviews = booking_check.reviews.find(
      (i) => i.user.toString() === userfind._id.toString()
    );
    if (!reviews) {
      booking_check.reviews.push(option);
    } else {
      (reviews.rating = rating), (reviews.comment = comment),(reviews.date = Date.now());
    }
    let sum = 0;
    if (booking_check?.reviews?.length > 0) {
      booking_check.reviews.forEach((item) => {
        sum += item.rating;
      });
    }
    booking_check.ratings = (sum / booking_check?.reviews?.length).toFixed(1);
    booking_check.save({ validateBeforeSave: false });

    //service review
    if (serviceId?.length > 0) {
      serviceId.forEach(async (element) => {
        const service_check = await Service.findById(element);
        if (!service_check) {
          return res.status(400).json({
            flag: false,
            message: "booking is not found",
          });
        }
        const reviews = service_check.reviews.find(
          (i) => i.user.toString() === userfind._id.toString()
        );
        if (!reviews) {
          service_check.reviews.push(option);
        } else {
          (reviews.rating = rating), (reviews.comment = comment),(reviews.date = Date.now());
        }
        let sum = 0;
        if (service_check?.reviews?.length > 0) {
          service_check.reviews.forEach((item) => {
            sum += item.rating;
          });
        }
        service_check.ratings = (sum / service_check?.reviews?.length).toFixed(
          1
        );
        service_check.save({ validateBeforeSave: false });
      });
    }

    //worker review
    if (workerId?.length > 0) {
      workerId.forEach(async (element) => {
        const worker_check = await WorkerProfile.findOne({ user: element });
        if (!worker_check) {
          return res.status(400).json({
            flag: false,
            message: "booking is not found",
          });
        }
        const reviews = worker_check.reviews.find(
          (i) => i.user.toString() === userfind._id.toString()
        );
        if (!reviews) {
          worker_check.reviews.push(option);
        } else {
          (reviews.rating = rating), (reviews.comment = comment ),(reviews.date = Date.now());
        }
        let sum = 0;
        if (worker_check?.reviews?.length > 0) {
          worker_check.reviews.forEach((item) => {
            sum += item.rating;
          });
        }
        worker_check.ratings = (sum / worker_check?.reviews?.length).toFixed(1);
        worker_check.save({ validateBeforeSave: false });
      });
    }
    const bookings = await Booking.find({ user: userfind._id }).populate(
      "user workers.user services services.service reviews.user paymentid"
    );
    res.status(200).json({
      flag: true,
      message: "review create successfully!",
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

exports.listReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("booking user");
    res.status(200).json({
      flag: true,
      message: "reviews getting successfully!",
      reviews,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Get a review booking by ID
exports.getReviewBookingById = async (req, res) => {
  try {
    const reviews = await Review.find({
      booking: { $eq: req.params.bookingId },
    }).populate("booking user");
    if (!reviews) {
      return res.status(404).send();
    }
    res.status(200).json({
      flag: true,
      message: "reviews getting successfully!",
      reviews,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).send();
    }
    res.status(200).json({
      flag: true,
      message: "review delete successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};
