const isAdminMiddleware = (...admin) =>{
    return(req,res,next)=>{
        if(admin.includes(req.user.userType)){
            next()
        }
        else{
            return res.status(400).json({
                success:false,
                message:'your are not admin'
            })
        }
    }
}
module.exports = isAdminMiddleware;