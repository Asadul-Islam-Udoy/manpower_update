const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const ClientProfile = require("../models/clientProfile");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const isAdminUserMiddleware = require("../middleware/AdminUserMiddleware");
const isAdminMiddleware = require("../middleware/AdminMiddleware");
const {
  Signin_And_SignUp_UserController,
  PhoneOrEmailVerifiedController,
  updateUserPhoneOrEmailController,
  deleteUserController,
  UserrefreshToken,
  UserUpdatePhoneOrEmailVerifiedController,
  ReactGoogleLoginController
} = require("../controllers/userController");
const userTokenMethod = require("../token/user_get_Token");

const router = express.Router();

router.post("/sign_in/sign_up", Signin_And_SignUp_UserController);
router.put("/signup/phone_email/verified", PhoneOrEmailVerifiedController);
router.delete(
  "/delete/user/:id",
  isAdminUserMiddleware,
  isAdminMiddleware("admin"),
  deleteUserController
);
router.put(
  "/update/user/phone_or_email",
  isAdminUserMiddleware,
  updateUserPhoneOrEmailController
);
router.put(
  "/update/user/phone_email/verified",
  isAdminUserMiddleware,
  UserUpdatePhoneOrEmailVerifiedController
);

router.post(
  "/refresh/token",
  UserrefreshToken,
);

////google authorization  
passport.use(

  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // google client id
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // google client secret
      // the callback url added while creating the Google auth app on the console
      callbackURL: "/api/users/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile,done) {
      
      const email =
        profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : null;
      const user = await User.findOne({ email: email || profile.id });
      if (user) {
        return done(null,user);
      }
      const create_user = await User.create({ email: email || profile.id });
      if (!create_user) {
        return res.status(400).json({
          flag: false,
          message: "user create fail!",
        });
      }
      if(create_user){
       await ClientProfile.create({
        user: create_user._id,
        phone_or_email: create_user.email,
        username: profile.displayName,
      });
     }
      return done(null, create_user);
    }
  )
);

// function to serialize a user/profile object into the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// function to deserialize a user/profile object into the session
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// authetication route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// Call back route
router.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    access_type: "offline",
    scope: ["email", "profile"],
  }),
  async(req, res) => {
    if (!req.user) {
      res.status(400).json({ error: "Authentication failed" });
    }
    console.log('google')
    // return user details
    await userTokenMethod(req.user, res, 200);
  }



  
);
router.post('/google_auth_react',ReactGoogleLoginController)
module.exports = router;
