const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/product.controller.js")

const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// const storageMulterHelper = require("../../helpers/storageMulter.helper.js")
const multer = require('multer')
const upload = multer()
cloudinary.config({ 
  cloud_name: 'ddr3axv38', 
  api_key: '147594271812811', 
  api_secret: 'KlZCzS0-PsCdv2TdvJf6Zu-pk-I' // Click 'View Credentials' below to copy your API secret
})


router.get("/", controller.index)
// dau / ~~ `${prefixAdmin}/products`

router.patch("/changeStatus/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)

router.delete("/delete/:id", controller.deleteItem)

router.get("/create", controller.createGET)
const validate = require("../../validate/admin/product.validate.js")
router.post("/create",
  upload.single('thumbnail'),
  function (req, res, next) {
    if(req.file){
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result)
              } else {
                reject(error)
              }
            }
          )
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        })
      }
  
      async function upload(req) {
        let result = await streamUpload(req)
        req.body[req.file.fieldname] = result.url
        // req.file.fieldname là thumbnail truyền từ name ở file pug
        next()
      }
      upload(req)
    }else next()
  },
  validate.createPOST,
  controller.createPOST
)

router.get("/edit/:id", controller.editGET)
router.patch("/edit/:id",
  upload.single('thumbnail'),
  validate.createPOST,
  controller.editPATCH
)

router.get("/detail/:id", controller.detailGET)

module.exports = router