const express = require("express")
const router = express.Router() //tạo mới 1 router

router.get("/", (req,res)=>{
  res.render("client/pages/home/index.pug")
})

module.exports = router