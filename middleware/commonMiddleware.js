const User = require('../models/user_schema')

const checkExistUser = async (req, res, next) => {
    const { email } = req.body;

    const userExists = await User.findOne({email:email});
    if(userExists) {
        return res.status(400).json({
            status:"failed",
            message: "User with this email is already exists"
        })
    }else{
        next()
    }
}

module.exports = { checkExistUser } ;