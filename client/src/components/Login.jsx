import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'

import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../graphql/queries/userQuery'

import '../App.css'

import { FaRegEyeSlash } from "react-icons/fa";
import { SlEye } from "react-icons/sl";
import { RxCrossCircled } from "react-icons/rx";

import { toast } from 'react-toastify'


export const Login = () => {

    const{register,handleSubmit,formState:{errors}}=useForm()
    const [showPassword,setShowPassword]=useState(false)
    const {user,setUser}=useContext(userContext)
    const navigate=useNavigate()

    const [getUser,{data,loading,error}]=useLazyQuery(GET_USER)
    const [emailError,setEmailError]=useState("")
    const [passwordError,setPasswordError]=useState("")

    console.log(user);

    useEffect(()=>{

      if(data?.getUser){
        console.log(data.getUser) 
        toast.success("user login successfull")
        
        const res=data.getUser
        
        setUser(
          {
            name:res.name,
            id:res.id,
            isAuthenticated:true
          }
        )
        navigate("/")
      }

    },[data])

    useEffect(()=>{
        if(error){
          if(error.graphQLErrors.length>0){
            const graphqlError=error.graphQLErrors[0]
            console.log(graphqlError);
            setEmailError("")
            setPasswordError("")
            if(graphqlError?.extensions?.emailError) setEmailError("invalid email")
            if(graphqlError?.extensions?.passworError) setPasswordError("invalid password")
          }else{
            console.log(error);
        }

        }
        
    },[error])

    const handleClose=()=>{
      navigate("/")
    }

    const onSubmit=async(userData)=>{

      try{
        console.log(userData);
        
        await getUser({
          variables:{email:userData.email,password:userData.password}
        })
        
      }catch(err){
        console.log("error from login.jsx onsubmit",err);
      }


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
               {...register("email", {required:"Email is empty"})}/>
               {/* validate:(data)=> data === user?.email || "Invalid email" */}

            {(errors.email &&  <p className="error-msg" >{errors.email.message} </p>) ||
               emailError && <p className="error-msg" >{emailError}</p>}

            <div className="password-section" >

              <input type={showPassword?"text":'password'} placeholder='Enter password' className='login-input' {...register("password", {required:"Password is empty"})}/>
              {/* ,validate:(data)=>data===user?.password || "check your password" */}

                 <span className="eye-span">
                    {showPassword? <FaRegEyeSlash onClick={handleShowPassword}  className="eye-icon" /> : <SlEye onClick={handleShowPassword}  className="eye-icon"/>  }
                </span>        
              

            </div>

            

            {(errors.password && <p className="error-msg">{errors.password.message}</p>) ||
              passwordError && <p className="error-msg">{passwordError}</p>
            }

            <button className='login-input login-btn' type='submit'>Login</button>

            <p style={{textAlign:"center",fontSize:"14px"}}>Don't have an account? <Link className="navigate-btn" to={'/register'}>Register</Link> </p>
          </form>

        </div>
    </div>
  )
}
