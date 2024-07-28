const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/role.controller.js")

router.get("/", controller.index)

router.get("/create", controller.createGET)
router.post("/create", controller.createPOST)

module.exports = router