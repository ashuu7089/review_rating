const bcrypt = require("bcrypt")
let user = require('../models/user_schema')
//User signup API
const userSignup = async (req,res)=>{
    console.log(req.body)
const {email, password} = req.body
const userData = await user(req.body)
try{
const isUserExists = await user.findOne({email : email})
     if(isUserExists){
        return res.status(409).json({
            status : false,
            error : "User with this email is already exists"
        })
    }
    const salt = await bcrypt.genSalt(10)
    userData.password = await bcrypt.hash(password, salt)
    await userData.save()
    return res.status(201).json({
        success : true,
        message : "Registration successfully",
    })
} catch (err){
    res.status(500).json({
        status : false,
        message : err.message
    })
}
}
module.exports = {
    userSignup
}