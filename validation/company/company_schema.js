const joi = require('@hapi/joi');
const {joiPasswordExtendCore } = require('joi-password')
const joiPassword = joi.extend(joiPasswordExtendCore)
const { companyCreate } = require('../../controllers/companyController')

const schema  = {
    companyName: joi.object({
        city: joi.string().max(20).required(),
        location: joi.string().required(),
        founded: joi.string().required(),

        
    }).unknown(true),



//companyList validation
companyList: joi.object({

}).unknown(true)
}
module.exports = schema