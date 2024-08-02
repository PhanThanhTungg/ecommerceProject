const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/search.controller.js")
//có thể dùng router = express() nhưng thừa thãi vì ở đây chỉ cần router

router.get("/products", controller.products)

module.exports = router