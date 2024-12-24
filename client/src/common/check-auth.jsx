
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated, user, children}) {

    const location = useLocation();

console.log(isAuthenticated, user?.role, );

    if(!isAuthenticated && 
        !(location.pathname.includes('/login') || 
        location.pathname.includes('/register'))
    ){
        return <Navigate to='/auth/login' />
    }

    if(isAuthenticated && 
        (location.pathname.includes('/login') || 
        location.pathname.includes('/register'))
    ){
        if(user?.role === 'admin'){
            return <Navigate to='/admin/dashboard' />
        }
        else if(user?.role === 'creator'){
            return <Navigate to='/creator/home' /> 
        }        
        else if(user?.role === 'user'){
            return <Navigate to='/user/home' /> 
        }    
    }
    if(isAuthenticated && user.role !== 'admin' && location.pathname.includes('admin')){
        return <Navigate to='unauth-page' />
    }
    if(isAuthenticated && user.role !== 'creator' && location.pathname.includes('creator')){
        return <Navigate to='unauth-page' />
    }
    if(isAuthenticated && user.role !== 'user' && location.pathname.includes('user')){
        return <Navigate to='unauth-page' />
    }

    if(isAuthenticated && user.role === 'admin' && (location.pathname.includes('creator') || location.pathname.includes('user')) ){
        return <Navigate to='/admin/dashboard'/>
    }
    if(isAuthenticated && user.role === 'creator' && (location.pathname.includes('admin') || location.pathname.includes('user')) ){
        return <Navigate to='/creator/home'/>
    }
    if(isAuthenticated && user.role === 'user' && (location.pathname.includes('creator') || location.pathname.includes('admin')) ){
        return <Navigate to='/user/home'/>
    }

  return (
    <>{children}</>
  )
}

export default CheckAuth
