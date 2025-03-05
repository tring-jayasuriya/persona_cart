import { createContext, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export const userContext=createContext()

function App() {

  const [cardInfo,setCardInfo]=useState([])
  const [user,setUser]=useState(null)

  return (
    
    <div className="app-container">

      <userContext.Provider value={{cardInfo,setCardInfo,user,setUser}}>
        <ToastContainer/>
        <Header/>
        <Outlet/>
      </userContext.Provider>
      
    </div>
  )
}

export default App
