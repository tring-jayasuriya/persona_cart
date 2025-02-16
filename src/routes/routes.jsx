import { Route, Routes } from "react-router-dom"
import App from "../App"
import { Login } from "../components/Login"
import { Register } from "../components/Register"
import { UserCard } from "../components/UserCard"
import { Personas } from "../components/Personas"


const Router=()=>{

    return(
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<UserCard/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="personas" element={<Personas/>}/>
                <Route path="uuid/:id" element={<Personas/>}/>
            </Route>
        </Routes>
        
    )
} 

export default Router