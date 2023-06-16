const reviewRouter = require('express').Router()
const reviewRating = require("../controllers/reviewController")
const validate = require('../validation/review/review_validation')
//const review = require("../routers/reviewRouter")

reviewRouter.post('/addreview/:cid/:uid', validate.reviewAddValidation, reviewRating)

module.exports = reviewRouter