const ServiceCategory = require("../models/serviceCategory");
const path = require("path");
const fs = require("fs");
//service category create
exports.serviceCategoryCreate = async (req, res) => {
  try {
    const { category_name, description, parentId } = req.body;
    let image = "";
    if (req.file) {
      image = req.file.filename;
    }
    const category = await ServiceCategory.create({
      category_name,
      image,
      parentId,
      description,
    });
    if (!category) {
      return res.status(400).json({
        flag: false,
        message: "service category create fails!",
      });
    }
    const categories = await ServiceCategory.find({});
    res.status(200).json({
      flag: true,
      message: "service category create successfully!",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///service filter method
async function FilterCategories(services, parentId = null) {
  const categoryList = [];
  let categoryfilter;
  if (parentId === null) {
    categoryfilter = await services.filter((i) => i.parentId == null);
  } else {
    categoryfilter = await services.filter((i) => i.parentId == parentId);
  }

  if (categoryfilter.length > 0) {
    for (let i of categoryfilter) {
      categoryList.push({
        _id: i._id,
        category_name: i.category_name,
        description: i.description,
        parentId: i.parentId,
        children: await FilterCategories(services, i._id),
      });
    }
  }
  return categoryList;
}

//get all service categories
exports.getAllServiceCategories = async (req, res) => {
  try {
    const categoriesList = await ServiceCategory.find().populate("parentId");
    if (!categoriesList) {
      return res.status(400).json({
        flag: false,
        message: "service categories getting fails!",
      });
    }
    const categories = await FilterCategories(categoriesList);
    if (categoriesList.length > 0) {
      categoriesList.forEach((element) => {
        if (element.parentId !== null) {
          categories.push(element);
        }
      });
    }
    res.status(200).json({
      flag: true,
      message: "service categories getting successfully!",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

//get single service category
exports.getSingleServiceCategory = async (req, res) => {
  try {
    const category = await ServiceCategory.findById(req.params.id).populate(
      "parentId"
    );
    if (!category) {
      return res.status(400).json({
        flag: false,
        message: "service categories getting fails!",
      });
    }
    res.status(200).json({
      flag: true,
      message: "service categories getting successfully!",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

//service category update
exports.serviceCategoryUpdate = async (req, res) => {
  try {
    const { category_name, description, parentId } = req.body;
    const category = await ServiceCategory.findByIdAndUpdate(
      req.params.id,
      { category_name, description, parentId },
      { new: true }
    );
    if (!category) {
      return res.status(400).json({
        flag: false,
        message: "service category update fails!",
      });
    }
    let image = "";
    if (req.file) {
      image = req.file.filename;
      imagepath = path.join(
        path.dirname(__dirname),
        "../backend/public/images/services_categories/"
      );
      if (fs.existsSync(imagepath + category.image)) {
        fs.unlink(imagepath + category.image, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("delete successfully");
          }
        });
      }
    }
    category.image = image || category.image;
    category.save({ validateBeforeSave: false });
    const categories = await ServiceCategory.find({}).populate("parentId");
    res.status(200).json({
      flag: true,
      message: "service category update successfully!",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

//service category delete
exports.serviceCategoryDelete = async (req, res) => {
  try {
    const servicecategoryid = await ServiceCategory.findById(req.params.id);
    if (servicecategoryid) {
      imagepath = path.join(
        path.dirname(__dirname),
        "../backend/public/images/services_categories/"
      );
      if (fs.existsSync(imagepath + servicecategoryid.image)) {
        fs.unlink(imagepath + servicecategoryid.image, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("delete successfully");
          }
        });
      }
    }
    const category = await ServiceCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(400).json({
        flag: false,
        message: "service category delete fails!",
      });
    }
    const categories = await ServiceCategory.find({}).populate("parentId");
    res.status(200).json({
      flag: true,
      message: "service category delete successfully!",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

//get  parent  service categories
exports.getParentCategoryController = async (req, res) => {
  try {
    const categories = await ServiceCategory.find({ parentId: { $eq: null } });
    res.status(200).json({
      flag: true,
      message: "service category getting successfully!",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};
