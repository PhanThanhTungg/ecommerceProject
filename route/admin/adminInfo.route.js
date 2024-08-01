const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/adminInfo.controller.js")
const validate = require("../../validate/admin/adminAcc.validate")

const multer = require('multer')
const upload = multer()
const cloudinaryMiddleware = require("../../middlewares/admin/cloudinary.middleware.js")

router.get("/", controller.index)

router.get("/edit", controller.editGET)

router.patch("/edit", 
  upload.single('avatar'),
  cloudinaryMiddleware.cloundinary,
  validate.editPATCH,
  controller.editPATCH
)

module.exports = router