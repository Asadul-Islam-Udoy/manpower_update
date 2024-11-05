const express = require('express');
const multer = require('multer');
const shoriid = require('shortid')
const path = require('path');
const isAdminUserMiddleware = require('../middleware/AdminUserMiddleware');
const isAdminMiddleware = require('../middleware/AdminMiddleware');
const { 
    updateWorkerProfile,
    getAllWorkerProfile,
    getUniqueWorkerProfile,
    updateWorkerProfileAvatar,
    findServiceToWorkersController,
    findWorkersToServicesController,
    updateWorkerIsFreeController,
    getAllDivisionController,
    getDistrictByDivisionIdController,
    getUpazilaByDistrictIdController
 } = require('../controllers/workerController');
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

//update worker profile 
router.put('/update/worker/profile/:workerid',isAdminUserMiddleware,isAdminMiddleware('admin'),updateWorkerProfile);

//update worker profile avatar 
router.put('/update/avatar/worker/profile/:workerid',isAdminUserMiddleware,upload.single('avatar'),updateWorkerProfileAvatar);

//update is is freee
router.put('/worker/is/free/:profileId',updateWorkerIsFreeController);

//get all worker profile
router.get('/get/all',getAllWorkerProfile);

//get unique client profile
router.get('/get/unique/worker/profile/:userid',getUniqueWorkerProfile);

//find services workers
router.get('/find/services/workers/:serviceId',findServiceToWorkersController);

//find  workers services
router.get('/find/workers/services/:profileId', findWorkersToServicesController);

//get all division
router.get('/get/all/divisions', isAdminUserMiddleware, isAdminMiddleware('admin'), getAllDivisionController);

//get all district by division id
router.get('/get/all/districts/:id', isAdminUserMiddleware, isAdminMiddleware('admin'), getDistrictByDivisionIdController);

//get all upazila by district id
router.get('/get/all/upazilas/:id', isAdminUserMiddleware, isAdminMiddleware('admin'), getUpazilaByDistrictIdController);

module.exports = router;