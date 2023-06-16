const joi = require("@hapi/joi")
//joi.objectId = require('joi-objectId')(joi);
const reviewSchema = {
    reviewRating : joi.object({
        subject : joi.string().min(2).max(200).required(),
        review : joi.string().min(2).max(200).required(),
        rating: joi.number().integer().min(1).max(5),
        })
}
module.exports = reviewSchema