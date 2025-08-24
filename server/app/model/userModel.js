const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    password:{
         type:String,
        require: true
    },
    phone:{
         type:String,
        require: true
    },
    roleId:{type:mongoose.Schema.Types.ObjectId,ref:'Role'},
       otp: {
        type: String,
        require: true
    },
    otpExpiry: {
        type: Date
    },
    isVerify: {
        type: Boolean,
        default: false
    }
})
const userModel=mongoose.model('user',userSchema)
module.exports=userModel