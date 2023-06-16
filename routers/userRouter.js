const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const validate = require('../validation/user/user_validation')
const valid = require('../middleware/auth_middleware')
const forget = require('../controllers/userController')
const {uploads} = require('../middleware/imageStorage')
const comp = require('../controllers/companyController')
const checkExistUser = require('../middleware/commonMiddleware')




router.post('/registeruser', uploads.single("profilePic"), validate.registerUserValidation, user.userSignup)
router.post('/userlogin',validate.userLoginValidation,user.userLogin)

router.post('/resetpassword/:userid/:token',user.resetPassword)

router.post('/forgetpass',user.forgetPassWordEmail)
router.post('/checkauth',valid,user.userLogin)

module.exports = router ;