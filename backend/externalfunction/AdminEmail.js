const { sendMailMethod } = require("../message/sendTokenEmail");
var randomToken = require("random-token");
const emailVerifiedMethod = async (req, res, admin) => {
    try {
        var token = randomToken(66);
        admin.is_token = token;
        admin.token_expiresIn = Date.now() + 24 * 60 * 60 * 1000; //you can add any expires time
        admin.save({ validateBeforeSave: false });
        var url =
            req.protocol + "://" + req.get("host") + "/api/admins/is_verified/email/";
        await sendMailMethod({
            subject: "This is the man power system",
            email: admin.email,
            message: token,
            url,
            res,
        });
        res.status(201).json({
            success: true,
            message: 'send verified link your email address please check it!'
        });
        return admin;
    } catch (error) {
        admin.is_email_verified = false;
        admin.is_token = undefined;
        admin.token_expiresIn = undefined;
        admin.save({ validateBeforeSave: false });
        return res.status(400).json({
            success: false,
            message: err,
        });
    }
};

module.exports = emailVerifiedMethod;
