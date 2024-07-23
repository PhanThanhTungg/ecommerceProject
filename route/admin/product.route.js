const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/product.controller.js")

router.get("/", controller.index)
// dau / ~~ `${prefixAdmin}/products`
router.patch("/changeStatus/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.deleteItem)

module.exports = router