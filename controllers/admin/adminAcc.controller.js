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

module.exports.editGET = async(req,res)=>{
  try {
    const adminAcc = await AdminAcc.findOne({_id: req.params.id}).select("-token -password")
    const roles = await Role.find({deleted: false})
    res.render("admin/pages/adminAcc/edit.pug",{
      pageTitle: "Chỉnh sửa tài khoản",
      adminAcc: adminAcc,
      roles: roles
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/adminAccs`)
  }
}

module.exports.editPATCH = async(req,res)=>{
  if(!req.body.password){
    delete req.body.password
  }
  else{
    req.body.password = md5(req.body.password)
  }

  await AdminAcc.updateOne({_id: req.params.id, deleted: false}, req.body)

  req.flash("success", "Cập nhật thành công")
  res.redirect("back")

}