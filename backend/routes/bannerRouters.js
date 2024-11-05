const express = require('express');
const multer = require('multer');
const shoriid = require('shortid')
const path = require('path');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const { 
    crateBannerController, 
    deleteBannerController,
    updateBannerController,
    getAllBannerController,
    updateBannerisActiveController,
    getIsActiveBannersController,
    getSingleBannersController
    } = require('../controllers/bannerController');

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'../backend/public/images/banners'))
    },
    filename: function (req, file, cb) {
      cb(null, shoriid.generate()+ '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });
router.post('/create',isAdminUserMiddleware,isAdminMiddleware('admin'),upload.array('images'),crateBannerController);
router.delete('/delete/:id',isAdminUserMiddleware,isAdminMiddleware('admin'),deleteBannerController);
router.get('/get/all',isAdminUserMiddleware,isAdminMiddleware('admin'),getAllBannerController);
router.get('/get/active',getIsActiveBannersController);
router.get('/get/single/banner/:id',isAdminUserMiddleware,isAdminMiddleware('admin'),getSingleBannersController);
router.put('/update/:id',isAdminUserMiddleware,isAdminMiddleware('admin'),upload.array('images'),updateBannerController);
router.put('/update/isactive/:id',isAdminUserMiddleware,isAdminMiddleware('admin'),updateBannerisActiveController);

module.exports = router;


