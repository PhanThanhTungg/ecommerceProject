const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/auth.controller.js")


router.get("/login", controller.loginGET)
router.post("/login", controller.loginPOST)


module.exports = router