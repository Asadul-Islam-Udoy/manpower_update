const express = require('express');
const multer = require('multer');
const shoriid = require('shortid')
const path = require('path');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const { 
    updateClientProfile ,
    getAllClientProfile,
    getUniqueClientProfile,
    updateNidVerified
   } = require('../controllers/clientController');


const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'../backend/public/images/avatars'))
    },
    filename: function (req, file, cb) {
      cb(null, shoriid.generate()+ '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

// update client profile
router.put('/update/client/profile/:userid',upload.single('avatar'),isAdminUserMiddleware,updateClientProfile);

// client nid verified and update 
router.put('/client/profile/nid_number/verified/:userid',isAdminUserMiddleware,isAdminMiddleware('admin'),updateNidVerified);

//get all client profile
router.get('/get/all',isAdminUserMiddleware,isAdminMiddleware('admin'),getAllClientProfile);

//get unique client profile
router.get('/get/unique/client/profile/:userid',getUniqueClientProfile);


module.exports = router;