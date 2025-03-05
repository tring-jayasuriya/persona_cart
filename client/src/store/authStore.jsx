import { create } from "zustand";

export const userAuth=create((set)=>({

    user:null,
    isAuthenticated:false,

    handleRegister:(userData)=>{
        console.log("log from handle register");
        set({user:userData, isAuthenticated:true})
    },

    logout:()=>{
        set({user:null,isAuthenticated:false})
    }

}))