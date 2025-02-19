import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../App.css'
import { userAuth } from '../store/authStore'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import { toast } from 'react-toastify'
import { FaRegEyeSlash } from "react-icons/fa";
import { SlEye } from "react-icons/sl";
import { RxCrossCircled } from "react-icons/rx";


export const Login = () => {

    const{register,handleSubmit,watch,formState:{errors}}=useForm()
    const [showPassword,setShowPassword]=useState(false)
    const {user,setUser}=useContext(userContext)
    const navigate=useNavigate()
    console.log(user);

    const handleClose=()=>{
      navigate("/")
    }

    const onSubmit=(data)=>{

      setUser((prev)=>(
        {
          ...prev,
          isAuthenticated:true
        }
      ))

      toast.success("user login successfull")
      navigate("/")

    }

    const  handleShowPassword=()=>{
      setShowPassword((prev)=>!prev)
    }
    

  return (
    <div className='login-container'>
        <div className='form-wrapper'>
            <RxCrossCircled className='cancel-icon' onClick={handleClose}/>

          <form  className='login-form' onSubmit={handleSubmit(onSubmit)}>
            <h1 style={{textAlign:"center"}}>Login</h1>

            <input 
              placeholder='Enter email'
              className='login-input'
               {...register("email", {required:"Email is empty",validate:(data)=> data === user?.email || "Invalid email" })}/>

            {errors.email &&  <p className="error-msg" >{errors.email.message}</p>}

            <div className="password-section" >

              <input type={showPassword?"text":'password'} placeholder='Enter password' className='login-input' {...register("password", {required:"Password is empty",validate:(data)=>data===user?.password || "check your password"})}/>

                 <span className="eye-span">
                    {showPassword? <FaRegEyeSlash onClick={handleShowPassword}  className="eye-icon" /> : <SlEye onClick={handleShowPassword}  className="eye-icon"/>  }
                </span>        
              

            </div>

            

            {errors.password && <p className="error-msg">{errors.password.message}</p>}

            <button className='login-input login-btn' type='submit'>Login</button>

            <p style={{textAlign:"center",fontSize:"14px"}}>Don't have an account? <Link className="navigate-btn" to={'/register'}>Register</Link> </p>
          </form>

        </div>
    </div>
  )
}
