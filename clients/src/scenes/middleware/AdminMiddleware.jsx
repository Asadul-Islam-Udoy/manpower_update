import React from 'react'
import { Navigate } from 'react-router-dom';
function AdminMiddleware({isAdmin,children}) {
  if (!isAdmin){
    return  <Navigate to='/dashboard/login' replace/>
  }
  return children ;
}

export default AdminMiddleware;
