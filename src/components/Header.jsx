import React, { useContext } from 'react'
import '../App.css'
import TringappsLogo from '../assets/tringapps_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import { toast } from 'react-toastify'

export const Header = () => {

  const navigate=useNavigate()

  const {user,setUser}=useContext(userContext)

  const handleLogout=()=>{
    setUser({
      ...user,
      isAuthenticated:false,
    })
    toast.error("uses logged out")

      navigate("/login")

  }

  return (
    <div className='header-component'>
        <div>
            <img src={TringappsLogo} />
        </div >
        <div  style={{padding:"0px 80px"}}>
          {
            user.isAuthenticated ?

             <button onClick={handleLogout} className='header-btn'>Logout</button> :

            <div>
              <button className='header-btn'> <Link to={'/login'} > Login </Link> </button>
              <button className='header-btn'> <Link to={'/register'} > Register </Link> </button>
            </div>
          }
            
        </div>
    </div>
  )
}
