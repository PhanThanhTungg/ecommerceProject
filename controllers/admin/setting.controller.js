
const GeneralSetting = require("../../models/generalSetting.model")
module.exports.generalGET = async (req,res)=>{

  const generalSetting = await GeneralSetting.findOne({})
  res.render("admin/pages/setting/generalSetting",{
    pageTitle: "Cài đặt chung",
    settingGeneral: generalSetting
  })
}

module.exports.generalPATCH = async (req,res)=>{
  if(await GeneralSetting.countDocuments({})==0){
    const tmp = new GeneralSetting(req.body)
    await tmp.save()
  }
  else{
    await GeneralSetting.updateOne({},req.body)
  }
  req.flash("success", "Cập nhật thành công")
  res.redirect('back')
}