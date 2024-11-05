const WorkerProfile = require("../models/workerProfile");
const Service = require("../models/service");
const SearchWorker = require("../externalfunction/WorkerSearch");
const path = require("path");
const fs = require("fs");
const Division = require("../models/division");
const District = require("../models/district");
const Upazila = require("../models/upazila");
///worker profile update
exports.updateWorkerProfile = async (req, res) => {
  try {
    const {
      listWorkerInfo,
      listWorkerAddress,
      listWorkerEducations,
      emergencyContract,
    } = req.body;
    const listWorkerIn = listWorkerInfo[0];
    const listAddressIn = listWorkerAddress[0];
    const worker = await WorkerProfile.findOne({ user: req.params.workerid });
    if (!worker) {
      return res.status(400).json({
        flag: false,
        message: "user is not found!",
      });
    }
    let servicesList = [];
    if (listWorkerIn?.servicesId.length > 0) {
      listWorkerIn?.servicesId.forEach((element) => {
        let result = servicesList.find((i) => i.service.toString() === element);
        if (!result) {
          servicesList.push({ service: String(element) });
        }
      });
    }

    let educationList = [];
    if (listWorkerEducations.length > 0) {
      listWorkerEducations?.forEach((element) => {
        educationList.push(element);
      });
    }

    worker.first_name = listWorkerIn?.first_name;
    worker.last_name = listWorkerIn?.last_name;
    worker.username = listWorkerIn?.username;
    worker.phone_number = listWorkerIn?.phone_number;
    worker.mother_tongue = listWorkerIn?.mother_tongue;
    worker.birthday = listWorkerIn?.birthday;
    worker.nationality = listWorkerIn?.nationality;
    worker.blood_group = listWorkerIn?.blood_group;
    worker.religion = listWorkerIn?.religion;
    worker.type = listWorkerIn?.type;
    worker.profile_description = listWorkerIn?.profile_description;
    worker.nid_number = listWorkerIn?.nidnumber || undefined;
    worker.services = servicesList;
    worker.relationship = listWorkerIn?.relationship;
    worker.gender = listWorkerIn?.gender;
    worker.education_qualification = educationList;
    worker.emergency_contract = emergencyContract;
    worker.languages = Array.from(new Set(listWorkerIn?.languages)) || [];
    worker.save({ validateBeforeSave: false });

    //address section
    const division_find = await Division.findOne({ profile_id: worker._id });
    if (division_find) {
      //update division
      const division_name = listAddressIn?.division_name;
      await Division.findByIdAndUpdate(
        division_find._id,
        { division_name },
        { new: true }
      );
      if (division_find) {
        const district_find = await District.findOne({
          division_id: division_find._id,
        });
        //update district
        if (district_find) {
          const district_name = listAddressIn?.district_name;
          await District.findByIdAndUpdate(
            district_find._id,
            { district_name },
            { new: true }
          );
          if (district_find) {
            const upazila_find = await Upazila.findOne({
              district_id: district_find._id,
            });
            if (upazila_find) {
              const upazila_name = listAddressIn?.upazila_name;
               const others_address= listAddressIn?.others_address
              await Upazila.findByIdAndUpdate(
                upazila_find._id,
                { upazila_name,others_address },
                { new: true }
              );
            }
          }
        }
      }
    } else {
      //create division
      const division = await Division.create({
        profile_id: worker._id,
        division_name: listAddressIn?.division_name,
      });
      if (division) {
        ///create district
        const district = await District.create({
          profile_id: worker._id,
          division_id: division._id,
          district_name: listAddressIn?.district_name,
        });
        if (district) {
          ///create upazila
          const upazila = await Upazila.create({
            profile_id: worker._id,
            district_id: district._id,
            upazila_name: listAddressIn?.upazila_name,
            others_address:listAddressIn?.others_address
          });
        }
      }
    }
    res.status(200).json({
      flag: true,
      message: "profile update successfully",
      workers: await WorkerProfile.find({ role: { $eq: "worker" } }).populate(
        "user"
      ),
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

////update worker profile avatar
exports.updateWorkerProfileAvatar = async (req, res) => {
  try {
    const worker = await WorkerProfile.findOne({ user: req.params.workerid });
    if (!worker) {
      return res.status(400).json({
        flag: false,
        message: "user is not found!",
      });
    }
    const avatarpath = path.join(
      path.dirname(__dirname),
      "../backend/public/images/avatars/"
    );
    if (fs.existsSync(avatarpath + worker.avatar)) {
      fs.unlink(avatarpath + worker.avatar, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("delete successfully!");
        }
      });
    }
    worker.avatar = req.file.filename;
    worker.save({ validateBeforeSave: false });
    const workers = await WorkerProfile.find({
      role: { $eq: "worker" },
    }).populate("user  services.service");
    res.status(201).json({
      flag: true,
      message: "worker avatar update successfully",
      workers,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///update worker is free
exports.updateWorkerIsFreeController = async (req, res) => {
  const workerProfile = await WorkerProfile.findById(req.params.profileId);
  if (!workerProfile) {
    return res.status(400).json({
      flag: false,
      message: "worker is not found",
    });
  }
  workerProfile.is_free = req.body.text;
  workerProfile.save({ validateBeforeSave: false });
  res.status(200).json({
    flag: true,
    message: "worker is is free update successfully",
  });
};

//search workers
exports.getAllWorkerProfile = async (req, res) => {
  try {
    const ApiFucture = new SearchWorker(
      WorkerProfile.find().populate("user services.service"),
      req.query
    ).search();
    const workers = await ApiFucture.query;
    res.status(201).json({
      flag: true,
      message: "workers profile getting successfully",
      workers,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

//get unique client profile
exports.getUniqueWorkerProfile = async (req, res) => {
  try {
    const worker = await WorkerProfile.findOne({
      user: req.params.userid,
    }).populate("user services.service");
    const division = await Division.findOne({profile_id:worker._id});
    const district = await District.findOne({division_id:division._id});
    const upazila = await Upazila.findOne({district_id:district._id});
    res.status(201).json({
      flag: true,
      message: "worker profile getting successfully",
      workerDetailsList:{worker,division,district,upazila}
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///service to workers find
exports.findServiceToWorkersController = async (req, res) => {
  try {
    const workers = await WorkerProfile.find().populate(
      "user services services.service reviews"
    );
    const serviceId = Array.from(new Set(req.params.serviceId.split(",")));
    const workerLists = [];
    if (serviceId.length > 0) {
      serviceId.forEach((servic) => {
        if (workers.length > 0) {
          workers.forEach((worker) => {
            const find_wroker = worker?.services.find(
              (i) => i.service._id.toString() == servic
            );
            if (find_wroker) {
              workerLists.push(worker);
            }
          });
        }
      });
    }
    res.status(200).json({
      flag: true,
      message: "services to workers getting successfully",
      workerLists,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///workers to service   find
exports.findWorkersToServicesController = async (req, res) => {
  try {
    const workers = await WorkerProfile.find({});
    const servicesItems = await Service.find({}).populate(
      "service_category_id"
    );
    const workerProfileId = Array.from(
      new Set(req.params.profileId.split(","))
    );
    const servicesLists = [];
    if (workerProfileId.length > 0) {
      workerProfileId.forEach((worker) => {
        const worker_find = workers.find((i) => i._id.toString() == worker);
        if (worker_find) {
          if (worker_find.services.length > 0) {
            worker_find.services.forEach((ser) => {
              find_service = servicesItems.find(
                (i) => i._id.toString() == ser.service.toString()
              );
              if (find_service) {
                servicesLists.push(find_service);
              }
            });
          }
        }
      });
    }
    res.status(200).json({
      flag: true,
      message: "workers to services getting successfully",
      servicesLists,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

///get all division
exports.getAllDivisionController = async (req, res) => {
  try {
    const divisions = await Division.find();
    res.status(200).json({
      flag: true,
      message: 'divisions getting successfully',
      divisions
    })
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
}

//get district by division id
exports.getDistrictByDivisionIdController = async (req, res) => {
  try {
    const districts = await District.find({division_id:req.params.id});
    res.status(200).json({
      flag: true,
      message: 'divisions getting successfully',
      districts
    })
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
}


///get upazila by district id
exports.getUpazilaByDistrictIdController = async (req, res) => {
  try {
    const upazilas = await Upazila.find({district_id:req.params.id});
    res.status(200).json({
      flag: true,
      message: 'divisions getting successfully',
      upazilas
    })
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
}
