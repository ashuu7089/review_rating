const mongoose =require("mongoose")
const reviewSchema = new mongoose.Schema({
    subject :{
        type : String,
        require : true,
    },
    review : {
        type : String,
        require : true,
    },
    rating :{
        type : String,
        require : true,
    },
    isActive :{
        type : String,
        default : true,
    },
    companyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "companyName",
        require : true  
    },
    userNameId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userName",
    }
})
reviewSchema.set('timestamps',true)
module.exports = mongoose.model("reviewdetails",reviewSchema)