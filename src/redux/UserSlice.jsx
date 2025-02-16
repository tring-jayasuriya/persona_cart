import { createSlice } from "@reduxjs/toolkit"


const initialState={
    name:"",
    email:"",
    password:""
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        
        register:(state,action)=>{
            state={...action.payload}
        },

        logout:(state)=>{
            state.name=""
            state.email=""
            state.password=""
        }
    }
})

export const {register,logout}=userSlice.actions

export default userSlice.reducer