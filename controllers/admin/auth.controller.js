const AdminAcc = require("../../models/adminAcc.model")
const systemConfig = require("../../config/system.js")

const md5 = require("md5")

module.exports.loginGET = (req,res)=>{
  res.render("admin/pages/auth/login.pug",{
    pageTitle: "Đăng nhập"
  })
}

module.exports.loginPOST = async (req,res)=>{
  const {email,password} = req.body
  const adminAcc = await AdminAcc.findOne({email: email, deleted: false})
  if(!adminAcc){
    req.flash("error", "Email không tồn tại")
    res.redirect(`back`)
    return
  }

  if(md5(password)!=adminAcc.password){
    req.flash("error", "Sai password")
    res.redirect(`back`)
    return
  }

  if(adminAcc.status=="inactive"){
    req.flash("error", "Tài khoản đang bị khóa")
    res.redirect(`back`)
    return
  }
  res.cookie("adminToken", adminAcc.token )
  req.flash("success","Đăng nhập thành công")
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}