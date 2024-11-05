const mongoose = require("mongoose");
const clientProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      trim: true,
      default:'Your Name Section'
    },
    role: {
      type: String,
      default: "client",
    },
    phone_or_email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    nid_number: {
      trype: String,
    },
    profile_description: {
      type: String,
      default:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi",
    },
    area: {
      type: String,
    },
    address: {
      type: String,
    },
    is_point: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClientProfile", clientProfileSchema);
