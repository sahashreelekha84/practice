const mongoose=require('mongoose');
const createroles = require('../seed/roleseed');
const seedadmin = require('../seed/seedAdmin');
const dbcon=async()=>{
    try{
const db=await mongoose.connect(process.env.MONGODB_URL)
if(db){
    console.log('Database Connected Successfully');
    try{
        await createroles()
    }
    catch(e){
        console.log('Role seeding failed');
        
    }
      try{
        await seedadmin()
        console.log('Admin seeding checked!');
    }
    catch(e){
        console.log('Admin seeding failed:', e.message);
        
    }
}
    }catch(error){
        console.log('connection failed');
        
    }
}
module.exports=dbcon