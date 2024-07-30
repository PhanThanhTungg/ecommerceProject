const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/adminAcc.controller.js")
const validate = require("../../validate/admin/adminAcc.validate")

const multer = require('multer')
const upload = multer()
const cloudinaryMiddleware = require("../../middlewares/admin/cloudinary.middleware.js")

router.get("/", controller.index)

router.get("/create", controller.createGET)
router.post("/create", 
  upload.single('avatar'),
  cloudinaryMiddleware.cloundinary,
  validate.createPOST,
  controller.createPOST
)

router.get("/edit/:id", controller.editGET)
router.patch("/edit/:id", 
  upload.single('avatar'),
  cloudinaryMiddleware.cloundinary,
  validate.editPATCH,
  controller.editPATCH
)

module.exports = router