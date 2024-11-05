const express = require('express');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const multer = require('multer');
const shoriid = require('shortid')
const path = require('path');


const {
    createService,
    listServices,
    getServiceById,
    updateService,
    deleteService,
    categoryIdServices,
    ServicesDiscount,
    getServiceCategoriesBasicContorller,
    getCategoriesServicesContorller,
    homeCategoryShowPerUniqueServiceController,
    homePagesNewServiceController
  } = require("../controllers/serviceController");

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(path.dirname(__dirname),'../backend/public/images/services'))
  },
  filename: function (req, file, cb) {
    cb(null, shoriid.generate()+ '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });
// Create a new service
router.post('/create', isAdminUserMiddleware,isAdminMiddleware('admin'),upload.single('image'), createService);

// Get a list of all services
router.get('/get/all', listServices);

// Get a single service by ID
router.get('/get/single/:id', getServiceById);

// Update a service by ID
router.put('/update/:id',isAdminUserMiddleware,isAdminMiddleware('admin'),upload.single('image'), updateService);

// Delete a service by ID
router.delete('/delete/:id',isAdminUserMiddleware,isAdminMiddleware('admin'),deleteService);

// category id base services
router.get('/category_id/services/:id', categoryIdServices);

// category id base services
router.put('/update/discount/:id',isAdminUserMiddleware, isAdminMiddleware('admin'), ServicesDiscount);

///get category basic services
router.get('/categories/basic/services',getServiceCategoriesBasicContorller);

///get category  services
router.get('/categories/services/:id',getCategoriesServicesContorller)

///home page unique category service show 
router.get('/home/pages/categories/services',homeCategoryShowPerUniqueServiceController);
//home page new services
router.get('/home/pages/new/services',homePagesNewServiceController);

module.exports = router;
