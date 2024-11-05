const adminTokenMethod = async(user,res,statusCode)=>{
   const token = user.getAdminTokenMethod();
   if(!token){
    return res.status(400).json({
        flag:false,
        message:'token request fail',
    })
   }

    res.status(statusCode).json({
    flag:true,
    message:'request successfully',
    user:{
      _id:user._id,
      name:user.name,
      email:user.email,
      phone:user.phone,
      avatar:user.avatar,
      userType:user.userType,
      role:user.role,
      is_email_verified:user.is_email_verified
    },
    token
   })
  
}
module.exports = adminTokenMethod;