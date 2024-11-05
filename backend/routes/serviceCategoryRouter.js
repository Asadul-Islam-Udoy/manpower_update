const express = require("express");
const isAdminUserMiddleware = require("../middleware/AdminUserMiddleware");
const isAdminMiddleware = require("../middleware/AdminMiddleware");
const multer = require('multer');
const shoriid = require('shortid')
const path = require('path');
const {
  serviceCategoryCreate,
  getAllServiceCategories,
  serviceCategoryUpdate,
  serviceCategoryDelete,
  getSingleServiceCategory,
  getParentCategoryController,
} = require("../controllers/serviceCategoryController");

const router = express.Router();

// Create a new service category

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(path.dirname(__dirname),'../backend/public/images/services_categories'))
  },
  filename: function (req, file, cb) {
    cb(null, shoriid.generate()+ '-' + file.originalname)
  }
})


const upload = multer({ storage: storage });

router.post(
  "/create",
  isAdminUserMiddleware,
  isAdminMiddleware("admin"),upload.single('image'),
  serviceCategoryCreate
);

// Get a list of all service categories
router.get("/get/all", getAllServiceCategories);
// Get a list of all service categories
router.get("/get/all/parent", getParentCategoryController);
// Get a single service category
router.get("/get/single/:id", getSingleServiceCategory);

// Update a service category
router.put(
  "/update/:id",
  isAdminUserMiddleware,
  isAdminMiddleware("admin"),
  upload.single('image'),
  serviceCategoryUpdate
);

// Delete service category
router.delete(
  "/delete/:id",
  isAdminUserMiddleware,
  isAdminMiddleware("admin"),
  serviceCategoryDelete
);

module.exports = router;
