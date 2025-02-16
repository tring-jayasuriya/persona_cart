import React, { useContext } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { toast } from "react-toastify";

export const Register = () => {

  const {user,setUser}=useContext(userContext)
  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();



  const onSubmit = (data)=>{
      console.log(data);
      
        setUser({
          ...data,
          isAuthenticated:false
        })

        toast.success("User registration successfull")

        navigate('/login')
  }

  console.log(user);
  

  return (
    <div className="login-container">
      <div className="form-wrapper">
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
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: "Invalid email",
              },
            })}
          />

          {errors.email && <p className="error-msg">{errors.email.message}</p>}

          <input
            type="text"
            placeholder="Enter password"
            className="login-input"
            {...register("password",
                {
                    required: "Password is empty",
                    pattern:{
                        // value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/,
                        // message:"password should contains uppercase,lowercase and symbol with minimum 8 characters"
                    },
                })}
          />

            {errors.password && <p className="error-msg">{errors.password.message}</p>}

          <input
            type="text"
            placeholder="Enter confirm password"
            className="login-input"
            {...register("confirmPassword", {
              required: "confirm  passsword is empty",
              validate: (data)=> data === watch("password")  || "confirm password does not match with password"
            })}
          />

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
