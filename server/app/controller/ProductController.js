const productModel = require("../model/product")

class productController{
async createproduct(req,res){
try{
const{name,description,price,category}=req.body
const pdata=await new productModel({
    name,description,price,category
})
const data=await pdata.save()
return res.status(201).json({
    status:true,
    message:'product created successfully',
    data:data
})
}catch(error){
return res.status(500).json({
    status:false,
    message:error.message,
    
})
}
}
async allproduct(req,res){
try{
const pdata=await productModel.find()

return res.status(200).json({
    status:true,
    message:' All product fetched  successfully',
    total:pdata.length,
    data:pdata
})
}catch(error){
return res.status(500).json({
    status:false,
    message:error.message,
    
})
}
}
async singleproduct(req,res){
try{
    const id=req.params.id
const pdata=await productModel.findById(id)

return res.status(200).json({
    status:true,
    message:' single product fetched  successfully',
   
    data:pdata
})
}catch(error){
return res.status(500).json({
    status:false,
    message:error.message,
    
})
}
}
async updateproduct(req,res){
try{
    const id=req.params.id
    const{name,description,price,category}=req.body
const pdata=await productModel.findByIdAndUpdate(id,req.body,{new:true})

return res.status(200).json({
    status:true,
    message:'  product updated successfully',
   
    data:pdata
})
}catch(error){
return res.status(500).json({
    status:false,
    message:error.message,
    
})
}
}
async deleteproduct(req,res){
try{
    const id=req.params.id
  
const pdata=await productModel.findByIdAndDelete(id)

return res.status(200).json({
    status:true,
    message:'product deleted successfully',
   
})
}catch(error){
return res.status(500).json({
    status:false,
    message:error.message,
    
})
}
}
}
module.exports=new productController()