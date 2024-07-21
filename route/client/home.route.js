const express = require("express")
const router = express.Router() //tạo mới 1 router
const controller = require("../../controllers/client/home.controller")

router.get("/", controller.index)

module.exports = router