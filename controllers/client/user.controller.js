const md5 = require("md5")
const User = require("../../models/clientAcc.model")
const ForgotPassword = require("../../models/forgot-password.model")
const Cart = require("../../models/cart.model")
const genOTP = require("../../helpers/generateRadomStr.helper")
const sendMailHelper = require("../../helpers/sendMail.helper")


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
  
    res.cookie("tokenUser", user.token)

    await Cart.create({user_id: user.id})
  
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

module.exports.forgotpasswordGET = async(req,res)=>{
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Lấy lại mật khẩu",
  })
}

module.exports.forgotpasswordPOST = async(req,res)=>{
  const user = await User.findOne({
    email: req.body.email,
    deleted: false
  })

  if(!user){
    req.flash("error", "email không tồn tại")
    res.redirect("back")
    return
  }

  if(user.status =="inactive"){
    req.flash("error", "Tài khoản đang bị khóa")
    res.redirect("back")
    return
  }

  const forgotPw = new ForgotPassword({
    email: req.body.email,
    otp: genOTP(6),
  })

  await forgotPw.save()

  sendMailHelper(forgotPw.email,"Xác thực mã OTP",
    `Mã OTP của bạn là <b>${forgotPw.otp}</b>. Có hiệu lực trong vòng 3 phút`
  )
  res.redirect(`/user/password/otp?email=${req.body.email}`)
}

module.exports.otpGET = async(req,res)=>{
  res.render("client/pages/user/otp",{
    pageTitle: "Nhập mã OTP",
    email: req.query.email
  })
}

module.exports.otpPOST = async(req,res)=>{
  const {email,otp} = req.body

  const checkotp = await ForgotPassword.findOne({
    email: email,
    otp: otp
  })

  if(!checkotp){
    req.flash("error","OTP không khớp")
    res.redirect("back")
    return
  }

  const user = await User.findOne({email:email})

  res.cookie("tokenUser",user.token)
  res.redirect("/user/password/reset")
}

module.exports.resetGET = async(req,res)=>{
  res.render("client/pages/user/reset",{
    pageTitle: "Đổi mật khẩu",
  })
}

module.exports.resetPOST = async(req,res)=>{
  const [pw,confirmPw] = Object.values(req.body)

  if(pw != confirmPw){
    req.flash("error", "Mật khẩu xác thực không khớp")
    res.redirect("back")
    return
  }

  await User.updateOne({token: req.cookies.tokenUser}, {password: md5(pw)})
  req.flash("success", "Đổi mật khẩu thành công")
  res.redirect("/")
}

module.exports.infoGET = async(req,res)=>{
  res.render("client/pages/user/info.pug",{
    pageTitle: "Thông tin cá nhân",
  })
}