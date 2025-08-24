const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const hashedpassword = (password) => {
    const salt = 10
    const hash = bcryptjs.hashSync(password, salt)
    return hash
}
const comparedpassword = (password, hashedpassword) => {
    return bcryptjs.compareSync(password, hashedpassword)
}
const AuthCheck = (req, res, next) => {
    const token = req?.headers['x-access-token']
    console.log('token',token);
    
    if (!token) {
        return res.status(400).json({
            status: false,
            message:'pls login 1st to access this page'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY)
        req.user = decoded
    } catch (error) {
        console.log(error);

    }
    next()
}
const checkRole=(roleName)=>(req,res,next)=>{
    if(req.user.roleName!==roleName){
        return res.status(403).json({message:'access denied'})
    }
    next()
}
const checkpermission=(permissions)=>(req,res,next)=>{
    console.log("req.user.permissions:", req.user.permissions.includes(permissions));
    if(!req.user.permissions.includes(permissions)){
        return res.status(403).json({message:'access denied permission'})
    }
    next()
}
module.exports = { hashedpassword, comparedpassword, AuthCheck ,checkRole,checkpermission}