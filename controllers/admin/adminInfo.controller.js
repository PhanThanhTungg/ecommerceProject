const AdminAcc = require("../../models/adminAcc.model")
const Role = require("../../models/role.model")
const md5 = require("md5")
const systemConfig = require("../../config/system.js")

module.exports.index = async(req,res)=>{
  const currentAdmin = await AdminAcc.findOne({_id: res.locals.currentAdmin.id})
  const role = await Role.findOne({_id: currentAdmin.role_id})
  res.render("admin/pages/adminInfo/index.pug",{
    pageTitle: "Thông tin cá nhân",
    currentAdmin: currentAdmin,
    roleTitle: role.title
  })
}

module.exports.editGET = async(req,res)=>{
  const currentAdmin = await AdminAcc.findOne({_id: res.locals.currentAdmin.id})
  res.render("admin/pages/adminInfo/edit.pug",{
    pageTitle: "Chỉnh sửa thông tin",
    currentAdmin: currentAdmin,
  })
}

module.exports.editPATCH = async(req,res)=>{
  if(!req.body.password){
    delete req.body.password
  }
  else{
    req.body.password = md5(req.body.password)
  }

  await AdminAcc.updateOne({_id: res.locals.currentAdmin.id, deleted: false}, req.body)

  req.flash("success", "Cập nhật thành công")
  res.redirect("back")

}

