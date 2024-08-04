const express = require("express")
const router = express.Router() //tạo mới 1 router
const controller = require("../../controllers/client/user.controller.js")
const validate = require("../../validate/client/user.validate.js")

router.get("/register",controller.registerGET)
router.post("/register",validate.registerPost,controller.registerPOST)

module.exports = router