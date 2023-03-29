const source = process.env.url;

const express = require("express")
require('dotenv').config()
require("./models/config")
const app =express()
const userRouter =require('./routers/userRouter')
app.use(express.json())

app.use('',userRouter)
console.log('hello ashu',process.env.port || 8500);

app.listen(8500, (req, res)=>{
    console.log(`Server started successfully: ${process.env.port || 8500}`)
})
