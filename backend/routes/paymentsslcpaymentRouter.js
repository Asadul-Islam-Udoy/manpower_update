const express = require('express');

const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware.js');
const isAdminMiddleware = require('../middleware/AdminMiddleware.js');
const {
     createPaymentControler,
     successPaymentControler,
     failPaymentControler,
     cancelPaymentControler,
     listPaymentsController,
     statusPaymentsController,
     methodPaymentsController,
     getPaymentByIdController,
     getPaymentByUserController,
     updatePaymentStatusController,
     deletePaymentController
 } = require('../controllers/pyamentSslcPayController.js');
const router = express.Router();


// Create a new payment
router.post('/create',createPaymentControler);
///payment success
router.post('/success',successPaymentControler);
///payment fail
router.post('/fail',failPaymentControler);
///payment cancel
router.post('/cancel',cancelPaymentControler);

// Get a list of all payments
router.get('/get/all', isAdminUserMiddleware,isAdminMiddleware('admin'), listPaymentsController);

//get payment status base
router.get('/get/payment/status', isAdminUserMiddleware,isAdminMiddleware('admin'), statusPaymentsController);

//get payment method base
router.get('/get/payment/method', isAdminUserMiddleware,isAdminMiddleware('admin'), methodPaymentsController);

// Get a single payment by ID
router.get('/get/single/:id', isAdminUserMiddleware,getPaymentByIdController);

// Get a  payment  by User
router.get('/get/payment_by_user/:id', isAdminUserMiddleware,getPaymentByUserController);

// Update payment status a payment by ID
router.put('/update/payment/status/:id', isAdminUserMiddleware,isAdminMiddleware('admin'),updatePaymentStatusController);

// Delete a payment by ID
router.delete('/delete/:id', isAdminUserMiddleware,isAdminMiddleware('admin'),deletePaymentController);

module.exports = router;
