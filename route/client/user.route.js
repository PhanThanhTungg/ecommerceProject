const express = require("express")
const router = express.Router() //tạo mới 1 router
const controller = require("../../controllers/client/user.controller.js")
const validate = require("../../validate/client/user.validate.js")
const userMiddleware = require("../../middlewares/client/user.middleware.js")

router.get("/register",controller.registerGET)
router.post("/register",validate.registerPost,controller.registerPOST)

router.get("/login",controller.loginGET)
router.post("/login",validate.loginPost,controller.loginPOST)

router.get("/logout", controller.logoutGET)

router.get("/password/forgot", controller.forgotpasswordGET)
router.post("/password/forgot",validate.forgotPasswordPost, controller.forgotpasswordPOST)
router.get("/password/otp",controller.otpGET)
router.post("/password/otp",controller.otpPOST)
router.get("/password/reset",controller.resetGET)
router.post("/password/reset",controller.resetPOST)

router.get("/info",userMiddleware.auth,controller.infoGET)

module.exports = router