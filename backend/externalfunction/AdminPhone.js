require("dotenv").config();
const crypto = require("crypto");
const Admin = require('../models/admin')
const AdminPhoneVerifiedMethod =  (req, res, admin) => {
    try{
    const otp = crypto.randomBytes(3).toString("hex").toLocaleUpperCase();
    admin.is_otp = otp;
    admin.otp_expiresIn = Date.now() + 24 * 60 * 60 * 10000; //you can add any expires time
    admin.save({ validateBeforeSave: false });
      // var options = {
    //     'method': 'POST',
    //     'url': 'https://api.sms.net.bd/sendsms',
    //     formData: {
    //       'api_key': 'ugg38ByLKUCPXaxl23RrtO4lAHo6SCiWAfS92nYi',
    //       'msg': otp,
    //       'to': phonenumber
    //     }
    //   };
    //   request(options, ( async (error, response)=> {
    //     if (error){
    //                await Admin.findByIdAndDelete(admin._id);
    //                 res.status(401).json({
    //                 success: false,
    //                 message:"Invalid  Phone Number",
    //          });
    //     }
    //     else{
    //         return  res.status(200).json({
    //             success: true,
    //             message: "send verified otp your phone number check it!",
    //         });
    //     }
       
    //   }));
    }
    catch(eror){
        console.log(eror)
    }
};

module.exports = AdminPhoneVerifiedMethod;
