const systemConfig = require("../../config/system")
const AdminAcc = require("../../models/adminAcc.model")
module.exports = async(req,res,next)=>{
  const adminToken = req.cookies.adminToken
  if(!adminToken){
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    return
  }

  const adminAcc = await AdminAcc.findOne({
    token: adminToken,
    status: "active",
    deleted: false
  })

  if(!adminAcc){
    res.clearCookie("adminToken")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    return
  }

  next()
}