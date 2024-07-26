const express = require("express")
const router = express.Router()

const controller = require("../../controllers/admin/category.controller.js")

const validate = require("../../validate/admin/category.validate.js")

const multer = require('multer')
const upload = multer()

router.get("/", controller.index)

router.get("/create", controller.createGET)

const cloudinaryMiddleware = require("../../middlewares/admin/cloudinary.middleware.js")
router.post("/create", 
  upload.single('thumbnail'),
  cloudinaryMiddleware.cloundinary,
  validate.createPOST,
  controller.createPOST
)

module.exports = router