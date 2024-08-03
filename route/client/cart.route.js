const express = require("express")
const router = express.Router() //tạo mới 1 router
const controller = require("../../controllers/client/cart.controller")

router.get("/",controller.indexGET)

router.post("/add/:productId", controller.addPOST)

router.delete("/delete/:id", controller.deleteDELETE)

router.get("/update/:id/:quantity", controller.updateGET)

module.exports = router