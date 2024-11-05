const Admin = require("../models/admin");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const isAdminMiddleware = async (req, res, next) => {
  try {
    const accesstoken = req.headers["authorization"];

    if (!accesstoken) {
      return res.status(400).json({
        success: false,
        message: "undefiend token!",
      });
    }
    const decode = await jwt.verify(
      accesstoken,
      process.env.JWT_SECRITE_KEY,
      function (err, decoded) {
        if (err) {
          res.status(400).json({
            success: false,
            message: err.message,
          });
        } else {
          return decoded;
        }
      }
    );
    if (decode) {
      const adminfind = await Admin.findById(decode._id);
      const userfind = await User.findById(decode._id);
      if (!adminfind && !userfind) {
        res.status(400).json({
          success: false,
          message: "user token is wrong",
        });
      } else {
        if (adminfind) {
          req.user = adminfind;
          next();
        }
        if (userfind) {
          req.user = userfind;
          next();
        }
      }
    } else {
      console.log("token errors");
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Admin token somthing is  wrong",
      err,
    });
  }
};
module.exports = isAdminMiddleware;
