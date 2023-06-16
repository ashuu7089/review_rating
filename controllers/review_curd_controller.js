const reviewcurd = require('../models/review_curd_schema')

//Add review

const addreview = async (req, res)=>{
    const newReview = new reviewcurd(req.body)
    if(newReview != null){ 
        await newReview.save()
        res.status(200).send({
        success : true,
        message : " Review created successfully"
    })
}else{
    res.status(401).send({
        success : false,
        message : "Data not found"
    })
}
   
}

//Get all Reviewlist

const getAllReview = async (req, res)=>{
    const getAll = await reviewcurd.find()
    if(getAll){
        res.status(200).send({
            success : true,
            message : "All data find successfully",
            review : getAll
        })
    }else{
        res.status(401).send({
            success : false,
            message : "Data not found"
        })
    }
   
}

//Delete Review

const deleteReview = async (req, res)=>{
    await reviewcurd.findByIdAndDelete(req.params.id)
    try{
        res.status(202).send({
            success : true,
            message : "Review deleted successfully"
        })
    }catch(error){
        res.status(500).send({
            success : false,
            message : error.message
        })
    }
}

//update Review

const updateReview = async (req, res)=>{
    try{
        const update = await reviewcurd.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators : true,
        })
        res.json(update)
    }catch(error){
        res.send("Error" +error)
    }
}
module.exports= {
    addreview, getAllReview, deleteReview, updateReview
}