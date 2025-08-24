const { hashedpassword } = require("../middleware/AuthCheck")
const Admin = require("../model/Admin")
const roleModel = require("../model/roleModel")
const userModel = require("../model/userModel")
const nodemailer=require('nodemailer')
const transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:process.env.my_email||`shreelekhasaha2000@gmail.com`,
    pass:process.env.my_password||`cvmgyapcgnbtnkrz`
  }
})
const seedadmin=async()=>{
const email='prasen@yopmail.com'
const password=Math.random().toString(36).slice(-8)
const hash=await hashedpassword(password)
const adminrole=await roleModel.findOne({name:'Admin'})
await Admin.create({
  email,
  password:hash,
  firstLogin:true,
  roleId:adminrole._id
})
await transporter.sendMail({
  from:process.env.my_email,
  to:email,
  text:`your one time password ${password}`,
})
}

module.exports=seedadmin