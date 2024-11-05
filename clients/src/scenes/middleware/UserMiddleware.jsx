import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function UserMiddleware({isUser,children}) {
   const location = useLocation();
   if(!isUser){
     return <Navigate to='/login' replace state={{from:location}}/>
   }
   return children;
}

export default UserMiddleware
