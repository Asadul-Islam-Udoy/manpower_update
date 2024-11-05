const mongoose = require("mongoose");
const ContractSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        is_admin_get: {
          type: Boolean,
          default: false,
        },
        date:{
          type:Date,
          default: Date.now()
        },
        username: {
          type: String,
          required: true,
        },
        email_or_phone: {
          type: String,
          required: true,
        },
      },
    ],
    is_admin_get: {
      type: Boolean,
      default: false,
    },
    date:{
      type:Date,
      default: Date.now()
    }
  },

  { timestamps: true }
);
module.exports = mongoose.model("Contract", ContractSchema);
