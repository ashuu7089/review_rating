const companyRouter = require("../controllers/companyController")
const router = require('express').Router()
const checkUserAuth = require('../middleware/auth_middleware')
const { uploads } = require("../middleware/imageStorage")
const { validate } = require("../models/company_schema")
const companyValidate = require('../validation/company/companyValidation')
const { isUser, isAdmin } = require('../middleware/authorization')

router.use(checkUserAuth)

router.post('/companycreate', uploads.single("company_logo"), companyRouter.createCompany)
router.get('/companylist', companyRouter.companyList)
router.get('/search/:location',companyRouter.searchCompany)
router.get('/reviewdetail/:id', companyRouter.companyReviewcomment)

module.exports = router;