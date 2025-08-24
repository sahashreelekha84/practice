const express=require('express')
const dbcon=require('./app/config/dbcon')
const dotenv=require('dotenv').config()
const cors=require('cors')

const app=express()
app.use(express.json())
app.use('/uploads', express.static('uploads'));
dbcon()
app.use(cors())
const authroute=require('./app/routes/authroute')
app.use('/api/auth',authroute)
const productroute=require('./app/routes/productroute')
app.use('/api/product',productroute)
const categoryroute=require('./app/routes/categoryroute')
app.use('/api/category',categoryroute)
const port=3005
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    
})