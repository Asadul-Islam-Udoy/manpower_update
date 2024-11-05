const Service = require("../models/service");
const ServiceCategory = require("../models/serviceCategory");
const ServicesSearch = require("../externalfunction/SearchServices");
const path = require("path");
const fs = require("fs");
// Create a new service
exports.createService = async (req, res) => {
  try {
    const { service_category_id, name, description, service_price } = req.body;
    let image = "";
    if (req.file) {
      image = req.file.filename;
    }
    const service = await Service.create({
      service_category_id,
      name,
      description,
      image,
      service_price,
    });
    if (!service) {
      return res.status(400).json({
        flag: false,
        message: "service create fails!",
      });
    }
    const services = await Service.find({}).populate(
      "service_category_id  reviews reviews.user"
    );
    res.status(200).json({
      flag: true,
      message: "service create successfully!",
      services,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// List all services ////apps developer
exports.listServices = async (req, res) => {
  try {
    // const services = await Service.find().populate(
    //   "service_category_id  reviews reviews.user"
    // );
    const ApiFucture = new ServicesSearch(
      Service.find().populate("service_category_id  reviews reviews.user"),
      req.query
    ).search();
    const services = await ApiFucture.query;
    if (!services) {
      return res.status(400).json({
        flag: false,
        message: "all service getting fails!",
      });
    }
    res.status(200).json({
      flag: true,
      message: "all service getting successfully!",
      services,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Get a service by ID ///apps developer
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "service_category_id  reviews reviews.user"
    );
    if (!service) {
      return res.status(400).json({
        flag: false,
        message: "single service getting fails!",
      });
    }
    res.status(200).json({
      flag: true,
      message: "single service getting successfully!",
      service,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(400).json({
        flag: false,
        message: "service update fails!",
      });
    }
    let image = "";
    if (req.file) {
      image = req.file.filename;
      imagepath = path.join(
        path.dirname(__dirname),
        "../backend/public/images/services/"
      );
      if (fs.existsSync(imagepath + service.image)) {
        fs.unlink(imagepath + service.image, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("delete successfully");
          }
        });
      }
    }
    service.image = image || service.image;
    service.save({ validateBeforeSave: false });
    const services = await Service.find({}).populate("service_category_id");
    res.status(200).json({
      flag: true,
      message: "service update successfully!",
      services,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const serviceid = await Service.findById(req.params.id);
    if (serviceid) {
      imagepath = path.join(
        path.dirname(__dirname),
        "../backend/public/images/services/"
      );
      if (fs.existsSync(imagepath + serviceid.image)) {
        fs.unlink(imagepath + serviceid.image, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("delete successfully");
          }
        });
      }
    }
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(400).json({
        flag: false,
        message: "service delete fails!",
      });
    }
    const services = await Service.find({}).populate("service_category_id");
    res.status(200).json({
      flag: true,
      message: "service delete successfully!",
      services,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///category id base find services
exports.categoryIdServices = async (req, res) => {
  try {
    const services = await Service.find({
      service_category_id: req.params.id,
    }).populate("service_category_id reviews reviews.user");
    if (!services) {
      return res.status(400).json({
        flag: false,
        message: "service  fails!",
      });
    }
    res.status(200).json({
      flag: true,
      message: "service getting successfully!",
      services,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

//service discount
exports.ServicesDiscount = async (req, res) => {
  try {
    const { discount, discount_type } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(400).json({
        flag: false,
        message: "service is not found!",
      });
    }
    service.service_discount.discount = discount;
    service.service_discount.discount_type = discount_type;
    service.save({ validateBeforeSave: false });

    const services = await Service.find({});

    res.status(200).json({
      flag: true,
      message: "discount add successfully",
      services,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///service filter method
async function FilterServices(services, parentId = null) {
  const serviceList = [];
  let servicefilter;

  const categoryList = [];
  let categoryfilter;
  if (parentId === null) {
    categoryfilter = await services.filter((i) => i.parentId == null);
  } else {
    categoryfilter = await services.filter((i) => i.parentId == parentId);
    servicefilter = await Service.find({
      service_category_id: { $eq: parentId },
    });
    if (servicefilter.length > 0) {
      servicefilter.forEach((ele) => {
        serviceList.push({ ele });
      });
    }
  }

  if (categoryfilter.length > 0) {
    for (let i of categoryfilter) {
      categoryList.push({
        _id: i._id,
        category_name: i.category_name,
        description: i.description,
        parentId: i.parentId,
        children: await FilterServices(services, i._id),
      });
    }
  }
  return [categoryList, serviceList];
}

////get categories basice services
exports.getServiceCategoriesBasicContorller = async (req, res) => {
  try {
    const services = await ServiceCategory.find().populate("parentId");
    if (!services) {
      return res.status(400).json({
        flag: false,
        message: "all service getting fails!",
      });
    }
    const categoryServiceList = await FilterServices(services);
    res.status(200).json({
      flag: true,
      message: "all service getting successfully!",
      categoryServiceList,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

////get categories  services
exports.getCategoriesServicesContorller = async (req, res) => {
  try {
    const servicesList = [];
    const parentCategory = await ServiceCategory.findById(req.params.id);
    if (parentCategory) {
      const parent_filter = await Service.find({
        service_category_id: { $eq: parentCategory._id },
      }).populate("service_category_id reviews reviews.user");
      if (parent_filter?.length > 0) {
        servicesList.push(parent_filter);
      }
      const Childcategories = await ServiceCategory.find({
        parentId: { $eq: parentCategory._id },
      });
      if (Childcategories?.length > 0) {
        Childcategories.forEach(async (element) => {
          const child_filter = await Service.find({
            service_category_id: { $eq: element._id },
          }).populate("service_category_id reviews reviews.user");
          if (child_filter?.length > 0) {
            servicesList.push(child_filter);
          }
        });
      }
    }
    const servicesLists = servicesList[0];
    res.status(200).json({
      flag: true,
      message: "all category service getting successfully!",
      servicesLists,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

////home category products
exports.homeCategoryShowPerUniqueServiceController = async (req, res) => {
  try {
    const servicesCategories = await Service.distinct("service_category_id");
    const services = await Service.find({}).populate("service_category_id");
    var servicesList;
    if (servicesCategories.length > 0) {
      servicesCategories.forEach((element) => {
        servicesList = services.filter(
          (i) => i.service_category_id._id.toString() == element.toString()
        );
      });
    }
    res.status(200).json({
      flag: true,
      message: " get home services successfully!",
      servicesList,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

////home pages new services
exports.homePagesNewServiceController = async (req, res) => {
  try {
    const currentDate = new Date(); // Current date and time
    const futureDate = new Date(currentDate.getTime()); // Add 15 days
    const services = await Service.find({}).populate("service_category_id");
    let servicesList;
    if (services.length > 0) {
      servicesList = services.filter(
        (item) =>
          new Date(item.updatedAt.getTime() + 40 * 24 * 60 * 60 * 1000) >=
          futureDate
      );
    }
    res.status(200).json({
      flag: true,
      message: " get home services successfully!",
      servicesList,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};
