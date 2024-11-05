const userTokenMethod = async(user,res,statusCode)=>{
    const token = user.getUserTokenMethod();
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
       phone:user.phone,
       email:user.email,
       userType:user.userType,
       is_phone_verified:user.is_phone_verified
     },
     token
    })
   
 }
 module.exports = userTokenMethod;