const express = require('express');
const { 
    createPaymentControler, 
    listPaymentsController, 
    getPaymentByIdController,
    updatePaymentStatusController,
    deletePaymentController,
    statusPaymentsController,
    methodPaymentsController,
    getPaymentByUserController,
    successPaymentControler,
    failPaymentControler,
    cancelPaymentControler
} = require('../controllers/paymentAmmerPayController.js');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware.js');
const isAdminMiddleware = require('../middleware/AdminMiddleware.js');
const router = express.Router();

// Create a new payment
router.post('/create',isAdminUserMiddleware, createPaymentControler);
///payment success
router.post('/success/:traidId',successPaymentControler);
///payment fail
router.post('/fail/:traidId',failPaymentControler);
///payment cancel
router.post('/cancel/:traidId',cancelPaymentControler);

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
