const reviewSchema = require('./review_schema')

module.exports = {
    reviewAddValidation : (req, res , next)=>{
        const value = reviewSchema.reviewRating.validate(req.body, { abortEarly : false})
        if(value.error){
            res.json({
                success : false,
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    }
}