const companySchema = require('./company_schema')

module.exports = {
    companyAddValidation : (req, res , next)=>{
        const value = companySchema.companyName.validate(req.body, { abortEarly : false})
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