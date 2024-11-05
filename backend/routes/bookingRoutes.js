const express = require('express');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware.js');
const {
    listBookings,
    getBookingById,
    getBookingByUserId,
    getBookingByWorkerId,
    updateBookingPaymentStatus,
    deleteBooking,
    updateBookingWorker,
    listNewBookings,
    getBookingByPaymentId,
    deleteBookingByPaymentId,
    getBookingPaymentStatus

  } = require("../controllers/bookingController.js");


const router = express.Router();


// Get a list of all bookings
router.get('/get/all/bookings',isAdminUserMiddleware,isAdminMiddleware('admin'), listBookings);


// Get a list of all bookings
router.get('/get/all/new/bookings',isAdminUserMiddleware,isAdminMiddleware('admin'), listNewBookings);

// Get a single booking by ID
router.get('/get/unique/booking/:id',isAdminUserMiddleware, getBookingById);

// Get  booking by user ID or client
router.get('/get/unique/user/booking/:userid', isAdminUserMiddleware, getBookingByUserId);

// Get  booking by worker ID 
router.get('/get/unique/worker/booking/:userid', isAdminUserMiddleware, getBookingByWorkerId);

// Update a booking payment status
router.put('/update/payment_status/:id',isAdminUserMiddleware, updateBookingPaymentStatus);

//get a booking payment status
router.get('/get/booking/payment_status/:status',isAdminUserMiddleware,isAdminMiddleware('admin'), getBookingPaymentStatus);

// Update or insert worker 
router.put('/update/booking/worker/:id',isAdminUserMiddleware,isAdminMiddleware('admin'), updateBookingWorker);

// Delete a booking by ID
router.delete('/delete/:id', isAdminUserMiddleware,isAdminMiddleware('admin'), deleteBooking);

///get booking by payment id
router.get('/get/booking/paymentid/:payid',isAdminUserMiddleware,isAdminMiddleware('admin'),getBookingByPaymentId);

///delete booking by payment id
router.delete('/delete/booking/paymentid/:payid',isAdminUserMiddleware,isAdminMiddleware('admin'),deleteBookingByPaymentId);

module.exports = router;
