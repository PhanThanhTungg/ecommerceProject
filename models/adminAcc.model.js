const mongoose = require("mongoose")
const generateRandomStrHelper = require("../helpers/generateRadomStr.helper.js")

const adminAccSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
		token:{
      type: String,
      default: generateRandomStrHelper(15)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const AdminAcc = mongoose.model("AdminAcc", adminAccSchema, "adminAccs");

module.exports = AdminAcc;