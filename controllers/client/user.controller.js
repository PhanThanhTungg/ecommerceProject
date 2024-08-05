const md5 = require("md5")
const User = require("../../models/clientAcc.model")

module.exports.registerGET = async (req,res)=>{
  if(!res.locals.user){
    res.render("client/pages/user/register", {
      pageTitle: "Đăng ký tài khoản",
    })
  }
  else{
    res.redirect("/")
  }
}

module.exports.registerPOST = async (req,res)=>{
  if(!res.locals.user){
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
  else{
    res.redirect("/")
  }
  
}

module.exports.loginGET = async (req,res)=>{
  if(!res.locals.user){
    res.render("client/pages/user/login", {
      pageTitle: "Đăng nhập",
    })
  }
  else{
    res.redirect("/")
  }
}

module.exports.loginPOST = async (req, res) => {
  if(!res.locals.user){
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({
      email: email,
      deleted: false
    })

    if(!user) {
      req.flash("error", "Email không tồn tại!")
      res.redirect("back")
      return
    }

    if(md5(password) != user.password) {
      req.flash("error", "Sai mật khẩu!")
      res.redirect("back")
      return
    }

    if(user.status != "active") {
      req.flash("error", "Tài khoản đang bị khóa!")
      res.redirect("back")
      return
    }

    res.cookie("tokenUser", user.token)
    
    res.redirect("/")
  }
  else{
    res.redirect("/")
  }
  
}

module.exports.logoutGET = async (req,res)=>{
  res.clearCookie("tokenUser")
  res.redirect("/")
}