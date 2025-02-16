import { Route, Routes } from "react-router-dom"
import App from "../App"
import { Login } from "../components/Login"
import { Register } from "../components/Register"
import { UserCard } from "../components/UserCard"
import { Personas } from "../components/Personas"
import { ProtectedRoutes } from "../components/ProtectedRoutes"


const Router=()=>{

    return(
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<UserCard/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="uuid/:id" element={
                    <ProtectedRoutes>
                        <Personas/>
                    </ProtectedRoutes>
                }/>
            </Route>
        </Routes>
        
    )
} 

export default Router