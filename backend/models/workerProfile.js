const mongoose = require("mongoose");
const workerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: "worker",
    },
    services: [
      {
        service: {
          type: mongoose.Schema.ObjectId,
          ref: "Service",
          required: true,
        },
      },
    ],
    is_free: {
      type: String,
      default: "YES",
    },
    phone_or_email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
    },
    birthday: {
      type: String,
    },
    blood_group: {
      type: String,
    },
    relationship: {
      type: String,
    },
    gender: {
      type: String,
    },
    religion: {
      type: String,
    },
    nationality: {
      type: String,
    },
    mother_tongue: {
      type: String,
    },
    languages: [],
    ratings: {
      type: Number,
      default: 0,
    },
    education_qualification: [
      {
        institute: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        education_level: {
          type: String,
        },
        major_subject: {
          type: String,
        },
        board_university: {
          type: String,
        },
        accreditation:{
          type: String,
        },
        admission_year: {
          type: String,
        },
        graduation_year: {
          type: String,
        },
        gpa_cgpa: {
          type: Number,
        },
        honors_awards: {
          type: String,
        },
        location: {
          type: String,
        },
      },
    ],
    emergency_contract: {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
      email: {
        type: String,
      },
      relationship: {
        type: String,
      },
      profession: {
        type: String,
      },
    },
    reviews: [
      {
        user: { type: mongoose.Schema.ObjectId, ref: "ClientProfile" },
        comment: { type: String, required: true },
        rating: { type: Number, default: 0 },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    avatar: {
      type: String,
    },
    nid_number: {
      type: String,
    },
    profile_description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkerProfile", workerProfileSchema);
