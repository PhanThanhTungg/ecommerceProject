const mongoose = require("mongoose")
const generateRandomStrHelper = require("../helpers/generateRadomStr.helper.js")

const clientAccSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
		token:{
      type: String,
      default: generateRandomStrHelper(16)
    },
    phone: String,
    avatar: String,
    status:{
      type: String,
      default: "active"
    },
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

const ClientAcc = mongoose.model("ClientAcc", clientAccSchema, "clientAccs")

module.exports = ClientAcc