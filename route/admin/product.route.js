const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/product.controller.js")

const multer  = require('multer')
const upload = multer({ dest:'./public/uploads/' })

router.get("/", controller.index)
// dau / ~~ `${prefixAdmin}/products`

router.patch("/changeStatus/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)

router.delete("/delete/:id", controller.deleteItem)

router.get("/create", controller.createGET)
router.post("/create", 
  upload.single('thumbnail'),
  controller.createPOST
)

module.exports = router