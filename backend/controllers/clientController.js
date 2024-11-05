const ClientProfile = require('../models/clientProfile');
const fs  = require('fs');
const path = require('path');

///client profile update //apps developer
exports.updateClientProfile = async (req, res) => {
    try {
      const { username, profile_description, area, address} = req.body;
      const client = await ClientProfile.findOne({ user: req.params.userid });
      let avatar = '';
      if(req.file){
        avatar = req.file.filename;
        avatarpath = path.join(path.dirname(__dirname),'../backend/public/images/avatars/');
        if(fs.existsSync(avatarpath+client.avatar)){
          fs.unlink(avatarpath+client.avatar,(err)=>{
            if(err){
              console.log(err);
            }
            else{
              console.log('delete successfully');
            }
          })
        }
      }
      if (!client) {
        return res.status(400).json({
          flag: false,
          message: "user is not found!",
        });
      }
      client.username = username;
      client.profile_description = profile_description;
      client.area = area;
      client.address = address;
      client.avatar = avatar || client.avatar || null;
      client.save({ validateBeforeSave: false });
      res.status(200).json({
        flag: true,
        message: "profile update successfully",
      });
    } catch (error) {
      return res.status(400).json({
        flag: false,
        message: error.message,
      });
    }
  };


  ///client profile nid verified and update  ////apps developer
exports.updateNidVerified = async (req, res) => {
  try {
    const { nid_number } = req.body;
    const client = await ClientProfile.findOne({ user: req.params.userid });
    if (!client) {
      return res.status(400).json({
        flag: false,
        message: "user is not found!",
      });
    }
    client.nid_number = nid_number;//nid will be verified
    client.save({ validateBeforeSave: false });
    res.status(200).json({
      flag: true,
      message: "nid number verified  successfully",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};



  //get all client profile
exports.getAllClientProfile=async(req,res)=>{
    try{
     const client_profile = await ClientProfile.find({role:{$eq:'client'}}).populate('user');
     res.status(201).json({
        flag:true,
        message:'clients profile getting successfully',
        client_profile
     })
    }
    catch (error) {
        return res.status(400).json({
          flag: false,
          message: error.message,
        });
      }
  }



    //get unique client profile ///apps developer
    exports.getUniqueClientProfile=async(req,res)=>{
        try{
         console.log(req.params.userid)
         const client = await ClientProfile.findOne({user:req.params.userid}).populate('user');
         res.status(201).json({
            flag:true,
            message:'client profile getting successfully',
            client
         })
        }
        catch (error) {
            return res.status(400).json({
              flag: false,
              message: error.message,
            });
          }

      
      }