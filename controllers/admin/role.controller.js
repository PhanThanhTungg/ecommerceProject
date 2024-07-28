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

module.exports.permissionsGET = async(req,res)=>{
  const roles = await Role.find({deleted: false})
  res.render("admin/pages/role/permissions.pug",{
    pageTitle: "Phân quyền",
    roles: roles
  })
}

module.exports.permissionsPATCH = async (req,res)=>{
  const permissions = JSON.parse(req.body.permissions)
  for(const permission of permissions){
    const [tmp1,...tmp2] = permission
    await Role.updateOne({_id: permission[0], deleted: false},{permissions: tmp2})
  }

  req.flash("success", "Cập nhật thành công")
  res.redirect("back")
}