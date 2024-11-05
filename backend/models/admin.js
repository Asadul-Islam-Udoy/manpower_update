const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
    },
    userType: {
      type: String,
      default: "admin", ///['client','worker','admin']
    },
    avatar: {
      type: String,
    },
    is_otp: {
      type: String,
    },

    otp_expiresIn: {
      type: Date,
    },
    is_token: {
      type: String,
    },

    token_expiresIn: {
      type: Date,
    },

    is_email_verified: {
      type: Boolean,
      default: false,
    },
    is_phone_verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

///hash password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

///compare passwrod
adminSchema.methods.passwordCompareMethod = async function (password) {
  return await bcrypt.compare(password, this.password);
};

///create json web token
adminSchema.methods.getAdminTokenMethod = function () {
  const accesstoken = jwt.sign({ _id: this._id }, process.env.JWT_SECRITE_KEY, {
    expiresIn: "10m",
  });
  const refreshtoken = jwt.sign(
    { _id: this._id },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "1h" }
  );

  const tokens = { accesstoken: accesstoken, refreshtoken: refreshtoken };
  return tokens;
};

module.exports = mongoose.model("Admin", adminSchema);
