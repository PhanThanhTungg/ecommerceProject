const systemConfig = require("../../config/system")
const AdminAcc = require("../../models/adminAcc.model")
const Role = require("../../models/role.model")
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

  const role = await Role.findOne({_id: adminAcc.role_id, deleted: false})
  res.locals.permissions = role.permissions

  next()
}