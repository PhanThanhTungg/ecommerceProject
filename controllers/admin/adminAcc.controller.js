const AdminAcc = require("../../models/adminAcc.model")
const Role = require("../../models/role.model")
const md5 = require("md5")
const systemConfig = require("../../config/system.js")

module.exports.index = async(req,res)=>{
  const adminAccs = await AdminAcc.find({deleted: false}).select("-password -token")
  for(const adminAcc of adminAccs){
    const role = await Role.findOne({deleted: false, _id: adminAcc.role_id})
    adminAcc.roleTitle = role.title
  }
  res.render("admin/pages/adminAcc/index.pug",{
    pageTitle: "Tài khoản admin",
    adminAccs: adminAccs
  })
}

module.exports.createGET = async(req,res)=>{
  const roles = await Role.find({deleted: false})
  console.log(roles)
  res.render("admin/pages/adminAcc/create.pug",{
    pageTitle: "Tạo tài khoản admin",
    roles: roles
  })
}

module.exports.createPOST = async(req,res)=>{
  req.body.password = md5(req.body.password)
  const adminAcc = new AdminAcc(req.body)
  await adminAcc.save()
  req.flash("success","Tạo tài khoản admin thành công")
  res.redirect(`${systemConfig.prefixAdmin}/adminAccs`)
}