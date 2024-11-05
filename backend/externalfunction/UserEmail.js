const { sendMailMethod } = require("../message/sendOtpEmail");
const crypto = require("crypto");

const emailVerifiedMethod = async (req, res, user, userEmail) => {
    try {
        const otp = crypto.randomBytes(3).toString("hex").toLocaleUpperCase();
        user.is_otp = otp;
        user.otp_expiresIn = Date.now() + 24 * 60 * 60 * 1000; //you can add any expires time
        user.save({ validateBeforeSave: false });
        await sendMailMethod({
            subject: "This is the man power system",
            email: userEmail,
            message:otp,
            res,
        });
        res.status(201).json({
            success: true,
            message: 'send verified otp your email address please check it!'
        });
        return user;
    } catch (error) {
        user.is_phone_verified = false;
        user.is_otp = undefined;
        user.otp_expiresIn = undefined;
        user.save({ validateBeforeSave: false });
        return res.status(400).json({
            success: false,
            message: err,
        });
    }
};

module.exports = emailVerifiedMethod;
