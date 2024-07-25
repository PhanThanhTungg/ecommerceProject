const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/product.controller.js")
//có thể dùng router = express() nhưng thừa thãi vì ở đây chỉ cần router

router.get("/", controller.index)

router.get("/:slug",controller.detailGET)

module.exports = router