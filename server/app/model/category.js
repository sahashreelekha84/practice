
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const createSchema=new Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
    category_name:{
        type:String,required:true
    },
    slug:{type:String,lower:true}
})
const categoryModel=mongoose.model('category',createSchema)
module.exports=categoryModel