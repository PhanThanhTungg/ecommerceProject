const Role = require("../../models/role.model")
const systemConfig = require("../../config/system.js")

module.exports.index = async(req,res)=>{
  const roles = await Role.find({deleted: false})
  res.render("admin/pages/role/index.pug",{
    pageTitle: "Nhóm quyền",
    roles: roles
  })
}

module.exports.createGET = async(req,res)=>{
  res.render("admin/pages/role/create.pug",{
    pageTitle: "Thêm nhóm quyền"
  })
}

module.exports.createPOST = async(req,res)=>{
  const role = new Role(req.body)
  await role.save()

  req.flash("success","Tạo nhóm quyền thành công")
  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}