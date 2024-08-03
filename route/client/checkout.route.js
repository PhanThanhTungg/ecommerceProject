const express = require("express")
const router = express.Router() //tạo mới 1 router
const controller = require("../../controllers/client/checkout.controller.js")

router.get("/",controller.indexGET)

router.post("/order",controller.orderPOST)

router.get("/success/:orderId",controller.successGET)

module.exports = router