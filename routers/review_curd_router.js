const review_curd_router = require('express').Router()
const reviewcurd = require("../controllers/review_curd_controller")

review_curd_router.post('/reviewcreate',reviewcurd.addreview)
review_curd_router.get('/getreview',reviewcurd.getAllReview)
review_curd_router.patch('/updatereview/:id',reviewcurd.updateReview)
review_curd_router.delete('/deletereview/:id',reviewcurd.deleteReview)

module.exports = review_curd_router