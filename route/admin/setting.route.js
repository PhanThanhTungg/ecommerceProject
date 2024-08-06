const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/setting.controller.js")

const multer  = require('multer')
const upload = multer()
const cloudinaryMiddleware = require("../../middlewares/admin/cloudinary.middleware.js")


router.get("/general", controller.generalGET)

router.patch("/general", 
  upload.single('logo'),
  cloudinaryMiddleware.cloundinary,
  controller.generalPATCH
)


module.exports = router