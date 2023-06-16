const express = require('express');
const router = express.Router();

const userRouter = require('../routers/userRouter')
const companyRouter = require('../routers/companyRouter')
const reviewRouter = require('../routers/reviewRouter') 
const review_curd = require('../routers/review_curd_router')

router.use("/user", userRouter)
router.use("/company", companyRouter)
router.use("/review", reviewRouter)
router.use("/reviewcrud", review_curd)

module.exports =router;
