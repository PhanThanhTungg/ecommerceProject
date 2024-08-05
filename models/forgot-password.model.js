const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: 
      { 
        type: Date, 
        default: new Date(Date.now()+3*60*1000)
      }
  },
  {
    timestamps: true,
  }
)

const ForgotPassword = mongoose.model("ForgotPassword",forgotPasswordSchema,"forgot-password")

module.exports = ForgotPassword