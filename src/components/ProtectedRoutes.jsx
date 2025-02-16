import React, { use, useContext, useEffect } from 'react'
import { userContext } from '../App'
import { useNavigate } from 'react-router-dom'

export const ProtectedRoutes = ({children}) => {
    const navigate=useNavigate()
    const {user}=useContext(userContext)

    useEffect(()=>{
        if(user==null || user?.isAuthenticated===false) navigate('/login') 
    })

    
    console.log(">>>>>> log",user);

    return  children

    

  
}
