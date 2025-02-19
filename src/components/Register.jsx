import React, { useContext, useState } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa";
import { SlEye } from "react-icons/sl"
import { RxCrossCircled } from "react-icons/rx";

export const Register = () => {

  const {user,setUser}=useContext(userContext)
  const navigate=useNavigate()
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword, setShowConfirmPassword]=useState(false)

  const handleClose=()=>{
    navigate("/")
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();



  const onSubmit = (data)=>{
      
        setUser({
          ...data,
          isAuthenticated:false
        })

        toast.success("User registration successfull")

        navigate('/login')
  }

  console.log(user);

  const  handleShowPassword=()=>{
    setShowPassword((prev)=>!prev)
  }

  const  handleShowConfirmPassword=()=>{
    setShowConfirmPassword((prev)=>!prev)
  }
  

  return (
    <div className="login-container">
      <div className="form-wrapper">

        <RxCrossCircled className='cancel-icon' onClick={handleClose}/>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ textAlign: "center" }}>Register</h1>

          <input
            type="text"
            placeholder="Enter name"
            className="login-input"
            {...register("name", { required: "Name is empty", validate:(data)=>data.length>=3 || "User name is too short"})}
          />

          {errors.name && <p className="error-msg">{errors.name.message}</p>}
          
          <input
            type="email"
            placeholder="Enter email"
            className="login-input"
            {...register("email", {
              required: "Email is empty",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
                message: "Invalid email",
              },
            })}
          />

          {errors.email && <p className="error-msg">{errors.email.message}</p>}

          <div className="password-section" >

            <input
                  type={showPassword? "text" : "password"}
                    placeholder="Enter password"
                    className="login-input"
                    {...register("password",
                        {
                            required: "Password is empty",
                            pattern:{
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:"password should contains uppercase,digit and symbol with minimum 8 characters"
                            },
                        })}
                  />

                  <span className="eye-span">
                    {showPassword? <FaRegEyeSlash onClick={handleShowPassword}  className="eye-icon" /> : <SlEye onClick={handleShowPassword}  className="eye-icon"/>  }
                  </span>        

          </div>  

            {errors.password && <p className="error-msg">{errors.password.message}</p>}

          <div className="password-section">
            
            <input
              type={showConfirmPassword? "text" : "password"} 
              placeholder="Enter confirm password"
              className="login-input"
              {...register("confirmPassword", {
                required: "confirm  passsword is empty",
                validate: (data)=> data === watch("password")  || "confirm password does not match with password"
              })}
            />

              <span className="eye-span">
                  {showConfirmPassword? <FaRegEyeSlash onClick={handleShowConfirmPassword}  className="eye-icon" /> : <SlEye onClick={handleShowConfirmPassword}  className="eye-icon"/>  }
              </span> 

          </div>

         

            {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword.message}</p>}


          <button className="login-input login-btn" type="submit">
            Register
          </button>
          <p style={{ textAlign: "center" , fontSize:"14px" }}>Have an account? <Link className="navigate-btn" to={'/login'}>Login</Link> </p>
        </form>
      </div>
    </div>
  );
};
