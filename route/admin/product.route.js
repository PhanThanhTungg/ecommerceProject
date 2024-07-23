const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/product.controller.js")

router.get("/", controller.index)
router.patch("/changeStatus/:status/:id", controller.changeStatus)

module.exports = router