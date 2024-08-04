const md5 = require("md5")
const User = require("../../models/clientAcc.model")

module.exports.registerGET = async (req,res)=>{
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  })
}

module.exports.registerPOST = async (req,res)=>{
  const userInfo = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
  }

  const user = new User(userInfo)
  await user.save()

  res.cookie("tokenUser", user.token);

  req.flash("success", "Đăng ký thành công")
  res.redirect("/")
}