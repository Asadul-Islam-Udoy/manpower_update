const express = require('express');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const multer = require('multer');
const path  = require('path');
const shortid = require('shortid');

const {
    createaAdmin,
    AdminrefreshToken,
    adminSignIn,
    emailVerified,
    phoneVerified,
    resendEmailLink,
    resendAdminPhoneOtp,
    listAdmins,
    getAdminById,
    updateAdminPhone,
    adminUpdatePhoneVerified,
    updateAdminEmail,
    deleteAdmin,
    adminPasswordReset,
    adminPasswordResetConfirm,
    updateAdminController
  } = require("../controllers/adminController");




const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),'../backend/public/images/avatars')
    )
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })


 // Create a new admin
router.post('/signup', createaAdmin);

//refresh admin token
router.post('/refresh/token',AdminrefreshToken);

//singin router
router.post('/signin',adminSignIn);

//email verified 
router.get('/is_verified/email/:token',emailVerified)

//phone verified 
router.get('/is_verified/phone/otp/:userOtp',phoneVerified)

//resend email link 
router.get('/resend/email_link/:id',resendEmailLink);

//resend admin phone otp
router.get('/resend/phone_otp/:id',resendAdminPhoneOtp);

// Get a list of all admins 
router.get('/get/all/admins', listAdmins);

// Get a single admin by ID
router.get('/get/single/admin/:id', getAdminById);

// Update a admin by ID
router.put('/update/admin/:id',  isAdminUserMiddleware,isAdminMiddleware('admin'),upload.single('avatar'),updateAdminController);

// Update a admin phone by ID
router.put('/update/admin/phone/:id', isAdminUserMiddleware,isAdminMiddleware('admin'),updateAdminPhone);

//admin update phone verified
router.put('/update/admin/verified/phone',isAdminUserMiddleware,isAdminMiddleware('admin'),adminUpdatePhoneVerified);

// Update a user email by ID
router.put('/update/admin/email/:id',isAdminUserMiddleware,isAdminMiddleware('admin'), updateAdminEmail);

// Delete a admin by ID
router.delete('/delete/admin/:id',isAdminUserMiddleware,isAdminMiddleware('admin'), deleteAdmin);

// reset admin password in phone
router.put('/admin/password/reset', adminPasswordReset);

//reset admin password verified in phone
router.put('/admin/password/reset/verified',adminPasswordResetConfirm);




module.exports = router;
