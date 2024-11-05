const express = require('express');
const { getVideoController, getAppsController, createVideosController, createAppsController } = require('../controllers/homepageController');
const multer = require('multer');
const shoriid = require('shortid')
const path = require('path');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const router = express.Router();


const storageapps = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'../backend/public/images/apps'))
    },
    filename: function (req, file, cb) {
      cb(null, shoriid.generate()+ '-' + file.originalname)
    }
  })
  
  const uploadapps = multer({ storage: storageapps });


  const storagevideos = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'../backend/public/images/videos'))
    },
    filename: function (req, file, cb) {
      cb(null, shoriid.generate()+ '-' + file.originalname)
    }
  })
  
  const uploadvideos = multer({ storage: storagevideos });
  

router.post('/create/apps',isAdminUserMiddleware,isAdminMiddleware('admin'),uploadapps.single('image'),createAppsController);

router.post('/create/videos',isAdminUserMiddleware,isAdminMiddleware('admin'),uploadvideos.single('video'),createVideosController);

router.get('/get/apps',getAppsController);

router.get('/get/videos',getVideoController);

module.exports = router;