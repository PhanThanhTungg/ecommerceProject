module.exports.createPOST = (req,res,next)=>{
  req.body.position = parseInt(req.body.position)
  if(req.body.title) next()
  else{
    req.flash("error", "vui lòng nhập tiêu đề")
    res.redirect('back')
  }
}
