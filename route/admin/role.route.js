const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/role.controller.js")

router.get("/", controller.index)

router.get("/create", controller.createGET)
router.post("/create", controller.createPOST)

router.get("/permissions", controller.permissionsGET)
router.patch("/permissions", controller.permissionsPATCH)

module.exports = router