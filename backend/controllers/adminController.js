const AsyncErrorHandler = require("../error/AsyncError");
const emailVerifiedMethod = require("../externalfunction/AdminEmail.js");
const AdminPhoneVerifiedMethod = require("../externalfunction/AdminPhone.js");
const Admin = require("../models/admin");
const adminTokenMethod = require("../token/admin_get_Token.js");
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');

// Create a admin
exports.createaAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const checkuseremail = await Admin.findOne({ email });
    if (checkuseremail) {
      return res.status(400).json({
        flag: false,
        message: "your email is already exists",
      });
    }
    const checkuserphone = await Admin.findOne({ phone });
    if (checkuserphone) {
      return res.status(400).json({
        flag: false,
        message: "your phone number is already exists",
      });
    }
    const admin = await Admin.create({
      name,
      email,
      password,
      phone,
    });
    if (admin) {
      // await emailVerifiedMethod(req, res, user); ///send mail verified link method
      await AdminPhoneVerifiedMethod(req, res, admin); ///phone number verification methond
    }
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "admin create fails" + error,
    });
  }
};

//email verified method
exports.emailVerified = async (req, res) => {
  try {
    const token = req.params.token;
    const admin = await Admin.findOne({
      is_token: token,
      token_expiresIn: { $gte: Date.now() },
    });
    if (admin) {
      admin.is_token = undefined;
      admin.token_expiresIn = undefined;
      admin.is_email_verified = true;
      admin.save();
      res.status(200).json({
        flag: true,
        message: "email validation successfully!",
      });
    } else {
      res.status(400).json({
        flag: false,
        message: "your token time is expires!",
      });
    }
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "admin email verified falis" + " " + error,
    });
  }
};

//phone verified method
exports.phoneVerified = async (req, res) => {
  try {
    const otp = req.params.userOtp;
    const admin = await Admin.findOne({
      is_otp: otp,
      otp_expiresIn: { $gte: Date.now() },
    });
    if (admin) {
      admin.is_otp = undefined;
      admin.otp_expiresIn = undefined;
      admin.is_phone_verified = true;
      admin.save({ validateBeforeSave: false });
      res.status(200).json({
        flag: true,
        message: "your validation is success please loing now!",
      });
    } else {
      res.status(400).json({
        flag: false,
        message: "your otp time is expires or wrong please check it!",
      });
    }
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "admin otp verified falis" + " " + error,
    });
  }
};

///resend email link
exports.resendEmailLink = async (req, res) => {
  const admin = await Admin.findById(req.params.id); ///user id
  await emailVerifiedMethod(req, res, admin); ///send mail verified link method
};

///resend phone otp
exports.resendAdminPhoneOtp = async (req, res) => {
  const admin = await Admin.findById(req.params.id); /// user id
  await AdminPhoneVerifiedMethod(req, res, admin, admin.phone); ///phone number verification methond
};

///user login controller
exports.adminSignIn = AsyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    return res.status(400).json({
      flag: false,
      message: "your email is not exists",
    });
  }
  const match = await admin.passwordCompareMethod(password);
  if (!match) {
    return res.status(400).json({
      flag: false,
      message: "incurrent password",
    });
  }
  await adminTokenMethod(admin, res, 200);
});

//toeken refresh
exports.AdminrefreshToken = async (req, res) => {
  try {
    const refreshtoken = req.headers["authorization"];
    const decode = await jwt.verify(
      refreshtoken,
      process.env.JWT_REFRESH_KEY,
      function (err, decoded) {
        if (err) {
          res.status(400).json({
            flag: false,
            message: err.message,
          });
        } else {
          return decoded;
        }
      }
    );
    if (decode) {
      const adminfind = await Admin.findById(decode._id);
      if (!adminfind) {
        res.status(400).json({
          flag: false,
          message: "admin token is wrong",
        });
      }
      await adminTokenMethod(adminfind, res, 200);
    } else {
      console.log("token errors");
    }
  } catch (err) {
    res.status(400).json({
      flag: false,
      message: "admin token somthing is  wrong",
    });
  }
};

// List all users
exports.listAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({
      flag: true,
      message: "all user getting successfully",
      admins,
    });
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "all admins getting fails",
    });
  }
};

// Get a user by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      res.status(400).json({
        flag: false,
        message: "user id is not validated!",
      });
    }
    res.status(200).json({
      flag: true,
      message: "getting single user successfully",
      admin,
    });
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "single user getting fails!",
    });
  }
};

// Update a admin
exports.updateAdminController = async (req, res) => {
  try {
    const { name } = req.body;
    const admin = await Admin.findById(req.params.id);
    let avatar = "";
    if (req.file) {
      avatar = req.file.filename;
      const avatarpath = path.join(path.dirname(__dirname),'../backend/public/images/avatars/');
      if(fs.existsSync(avatarpath+admin.avatar)){
        fs.unlink(avatarpath+admin.avatar,(err)=>{
          if(err){
            console.log(err)
          }
          else{
            console.log('file update  successfully!')
          }
        })
      }
    }
   
    if (!admin) {
      res.status(400).json({
        flag: false,
        message: "admin  is not found!",
      });
    }
  admin.name = name;
  admin.avatar = avatar || admin.avatar || null;
  admin.save({validateBeforeSave:false});
  await adminTokenMethod(admin, res, 200);
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
}; 

// Update a admin phone
exports.updateAdminPhone = async (req, res) => {
  try {
    const { adminPasswrod, newPhoneNumber } = req.body;
    const admin = await Admin.findById(req.params.id).select("+password");
    if (!admin) {
      res.status(400).json({
        flag: false,
        message: "admin  is not found!",
      });
    }

    const match = await admin.passwordCompareMethod(adminPasswrod);
    if (!match) {
      return res.status(400).json({
        flag: false,
        message: "incurrent password",
      });
    }
    const checkadminphone = await Admin.findOne({ newPhoneNumber });
    if (checkadminphone) {
      return res.status(400).json({
        flag: false,
        message: "your phone number is already exists",
      });
    }
    ///phone number verification methond
    await AdminPhoneVerifiedMethod(req, res, admin, newPhoneNumber);
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: "admin phone update fails!",
    });
  }
};

//admin update phone verified
exports.adminUpdatePhoneVerified = async (req, res) => {
  const { otp, newPhoneNumber } = req.body;
  const admin = await Admin.findOne({
    is_otp: otp,
    otp_expiresIn: { $gte: Date.now() },
  });
  if (!admin) {
    return res.status(400).json({
      flag: false,
      message: "your otp time is expires or otp is wrong!",
    });
  }
  admin.phone = newPhoneNumber;
  admin.is_otp = undefined;
  admin.otp_expiresIn = undefined;
  admin.save({ validateBeforeSave: false });
  res.status(200).json({
    flag: true,
    message: "phone number update successfully!",
  });
};

// Update a user email
exports.updateAdminEmail = async (req, res) => {
  try {
    const { adminPasswrod, newEmail } = req.body;
    const admin = await Admin.findById(req.params.id).select("+password");
    if (!admin) {
      res.status(400).json({
        flag: false,
        message: "admin id is not validated!",
      });
    }

    const match = await admin.passwordCompareMethod(adminPasswrod);
    if (!match) {
      return res.status(400).json({
        flag: false,
        message: "incurrent password",
      });
    }
    const checkadminemail = await Admin.findOne({ newEmail });
    if (checkadminemail) {
      return res.status(400).json({
        flag: false,
        message: "your email is already exists",
      });
    }
    const newupdate = await Admin.findByIdAndUpdate(
      req.params.id,
      { email: newEmail },
      { new: true }
    );
    ///send mail verified link method
    await emailVerifiedMethod(req, res, newupdate);
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: "admin email update fails!",
    });
  }
};

// Delete a Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "admin  is not validated!",
      });
    }
    const admins = await Admin.find();
    res.status(200).json({
      flag: true,
      message: "admin delete successfully!",
      admins,
    });
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "admin delete fails",
    });
  }
};

///user password reset
exports.adminPasswordReset = async (req, res) => {
  try {
    const newPhoneNumber = req.body.phone;
    const admin = await Admin.findOne({ phone: newPhoneNumber });
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "your phone number is not exists!",
      });
    }
    ///phone number verification methond
    await AdminPhoneVerifiedMethod(req, res, admin, newPhoneNumber);
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

///user password reset confirm verified;
exports.adminPasswordResetConfirm = async (req, res) => {
  try {
    const { otp, newPassword, confirmPassword } = req.body;
    const admin = await Admin.findOne({
      is_otp: otp,
      otp_expiresIn: { $gte: Date.now() },
    });
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "your otp is wrong or otp time is expires!",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        flag: false,
        message: "your confirm password is not match!",
      });
    }
    admin.password = newPassword;
    admin.is_otp = undefined;
    admin.otp_expiresIn = undefined;
    admin.save({ validateBeforeSave: false });

    res.status(201).json({
      flag: true,
      message: "password is update successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};
