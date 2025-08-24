const express=require('express')
const ProductController = require('../controller/productejscontroller')

const productimageupload = require('../helper/productimageupload')
const router=express.Router()
router.post('/create/product',productimageupload.single('image'),ProductController.createproduct)
router.get('/product/add',ProductController.addproduct)
router.get('/product/list',ProductController.allproduct)
router.get('/editproduct/:id',ProductController.singleproduct)
router.post('/updateproduct/:id',productimageupload.single('image'),ProductController.updateproduct)
router.get('/deleteproduct/:id',ProductController.deleteproduct)
module.exports=router