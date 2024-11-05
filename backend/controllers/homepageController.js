const Apps = require("../models/apps");
const HomeNotice = require("../models/homepagenotics");
const Video = require("../models/video");
const path = require('path');
const fs = require('fs')
////apps
exports.createAppsController = async (req, res) => {
  try {
    const find_apps = await Apps.find({});
    const apps = await Apps.create({
      title:req.body.title,
      description:req.body.description,
      image:req.file.filename 
    });
    if (!apps) {
      return res.status(400).json({
        flag: false,
        message: "create fails",
      });
    }
    if (find_apps.length > 0) {
      find_apps.forEach(async (element) => {
        if (apps._id !== element._id) {
          if (element.image) {
            const imagepath = path.join(
              path.dirname(__dirname),
              "../backend/public/images/apps/"
            );
            if (fs.existsSync(imagepath + element.image)) {
              fs.unlink(imagepath + element.image, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("delete successfully");
                }
              });
            }
          }
          await Apps.findByIdAndDelete(element._id);
        }
      });
    }
    res.status(200).json({
      flag: true,
      message: "create successfully",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};


////get apps
exports.getAppsController = async (req, res) => {
    try {
      const apps = await Apps.find({});
      res.status(200).json({
        flag: true,
        message: "getting successfully",
        apps

      });
    } catch (error) {
      return res.status(400).json({
        flag: false,
        message: error.message,
      });
    }
  };



////video
exports.createVideosController = async (req, res) => {
    try {
      const find_videos = await Video.find({});
      const videos = await Video.create({
        title:req.body.title,
        description:req.body.description,
        video:req.file.filename 
      });
      if (!videos) {
        return res.status(400).json({
          flag: false,
          message: "create fails",
        });
      }
      if (find_videos.length > 0) {
        find_videos.forEach(async (element) => {
          if (videos._id !== element._id) {
            if (element.video) {
              const imagepath = path.join(
                path.dirname(__dirname),
                "../backend/public/images/videos/"
              );
              if (fs.existsSync(imagepath + element.video)) {
                fs.unlink(imagepath + element.video, (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("delete successfully");
                  }
                });
              }
            }
            await Video.findByIdAndDelete(element._id);
          }
        });
      }
      res.status(200).json({
        flag: true,
        message: "create successfully",
      });
    } catch (error) {
      return res.status(400).json({
        flag: false,
        message: error.message,
      });
    }
  };


  ////get videos
exports.getVideoController = async (req, res) => {
    try {
      const videos = await Video.find({});
      res.status(200).json({
        flag: true,
        message: "getting successfully",
        videos

      });
    } catch (error) {
      return res.status(400).json({
        flag: false,
        message: error.message,
      });
    }
  };