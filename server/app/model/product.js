const mongoose=require('mongoose')
const schema=mongoose.Schema
const productschema=new schema({
    name:{type:String,require:true},

description:{type:String,require:true},

price:{type:Number,require:true},

category:{type:String,require:true},
image:{type:String}


},{timestamps:true})
const productModel=mongoose.model('product',productschema)
module.exports=productModel