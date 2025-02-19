import React, { useContext } from 'react'
import { userContext } from '../App'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom'

export const UserCard = () => {


    const {user,cardInfo}=useContext(userContext)
    const navigate=useNavigate()


    const addPersonaDetails=(cardDetails=null)=>{

        if(cardDetails!==null){
            navigate(`/persona/${cardDetails.uuid}`)
        }else{
            const uuid=uuidv4();
            navigate(`/persona/${uuid}`)
        }
    }
    

  return (
    <div className='userCard-main-Container'>

        <div className='add-persona-section'>
            <div className='persona-tag-section'>
                <p>{user?.name || ""}</p>
                <p className='persona-btn'>Persona</p>
            </div>
            <button onClick={addPersonaDetails} className='add-persona-btn'>
                +Add Persona
            </button>
        </div>

        <div className='usercard-flex-container'>

            <div className='card-wrapper'>

                {
                    user &&
                    cardInfo.map((details)=>(
                        <div onClick={()=>addPersonaDetails(details)} className='card' key={details.uuid}>
                            <img className='card-image' src={details.imageUrl || 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'}/>
                            <p   className='card-title'>{details.quote} </p>
                            <p className='card-quote'> I always want to learn more</p>
                            <p className='card-timestamp'>Last updated :1 min ago</p>
                        </div>
                    ))
                }

                <div className='card' onClick={()=>addPersonaDetails()}>
                    <img className='card-image' src='https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'/>
                    <p className='card-title'>Create card</p>
                    <p className='card-quote'>Write your own quote</p>
                    <p className='card-timestamp'>Last updated :</p>
                </div>


            </div>
            
        </div>

    </div>
  )
}
