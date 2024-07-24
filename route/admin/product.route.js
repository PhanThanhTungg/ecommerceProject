const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/product.controller.js")

const storageMulterHelper = require("../../helpers/storageMulter.helper.js")
const multer  = require('multer')
const upload = multer({storage: storageMulterHelper})

router.get("/", controller.index)
// dau / ~~ `${prefixAdmin}/products`

router.patch("/changeStatus/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)

router.delete("/delete/:id", controller.deleteItem)

router.get("/create", controller.createGET)
const validate = require("../../validate/admin/product.validate.js")
router.post("/create", 
  upload.single('thumbnail'),
  validate.createPOST,
  controller.createPOST
)

router.get("/edit/:id", controller.editGET)
router.patch("/edit/:id", 
  upload.single('thumbnail'),
  validate.createPOST,
  controller.editPATCH
)

module.exports = router