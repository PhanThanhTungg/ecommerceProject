const express = require("express")
const router = express.Router()
//có thể dùng router = express() nhưng thừa thãi vì ở đây chỉ cần router

router.get("/", (req,res)=>{
  res.send("Products")
})eqeqwe

module.exports = router