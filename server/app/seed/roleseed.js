const roleModel = require("../model/roleModel")

const createRoles=async()=>{
    const roles=[{name:'user',permissions:['read']},{name:'Admin',permissions:['create','read','update','delete']}]
    for(const role of roles){
        const existrole=await roleModel.findOne({name:role.name})
        if(!existrole){
            await roleModel.create(role)
            console.log(`role ${role.name} created`);
        }
    }
} 
module.exports=createRoles