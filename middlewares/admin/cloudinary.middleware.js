const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// const storageMulterHelper = require("../../helpers/storageMulter.helper.js")

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
})

module.exports.cloundinary = (req, res, next) =>{
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
  } else next()
}