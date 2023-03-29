const mongoose =require("mongoose")
const companySchema = new mongoose.Schema({
    companyName :{
        type : String,
        require : true,
    },
    city : {
        type : String,
        require : true,
    },
    location :{
        type : String,
        require : true,
    },
    founded:{
        type : String,
        require : true

    },
    isActive :{
        type : Boolean,
        default :true
    },

    userNameId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userName",
        require : true  
    },
    company_logo : {
        type : String,
    }
})
companySchema.set('timestamps',true)
module.exports = mongoose.model('companydetail',companySchema)