import React, { useContext, useEffect } from 'react'
import { userContext } from '../App'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CARDS } from '../graphql/queries/cardQuery'

export const UserCard = () => {

    const {user,cardInfo,setCardInfo}=useContext(userContext)
    const navigate=useNavigate()

    const {data,loading,error}=useQuery(GET_CARDS,
        {
            variables:user?.id ? {id:parseInt(user?.id,10)}:{},
            skip:!user?.id,
            fetchPolicy:"no-cache"
        }
    )
         
    const addPersonaDetails=(cardDetails=null)=>{

        if(cardDetails!==null){
            navigate(`/persona/${cardDetails.uuid}`)
        }else{
            const uuid=uuidv4();
            navigate(`/persona/${uuid}`)
        }
    }

    useEffect(()=>{
        if(cardInfo.length<=0){
            console.log("initial check");
            console.log(data?.getCards);
            setCardInfo(data?.getCards || [])
        }
    },[data])

    console.log("database card data",data?.getCards);

    useEffect(()=>{
        console.log(error);
    },[error])


  return (
    <div className='userCard-main-Container'>

        <div className='add-persona-section'>
            <div className='persona-tag-section'>
                <p>{user?.name || ""}</p>
                <p className='persona-btn'>Persona</p>
            </div>
            <button onClick={() => addPersonaDetails()} className='add-persona-btn'>
                +Add Persona
            </button>
        </div>

        <div className='usercard-flex-container'>

            <div className='card-wrapper'>

                {
                    user &&
                    cardInfo.map((details)=>(
                        <div onClick={()=>addPersonaDetails(details)} className='card' key={details?.uuid}>
                            <img className='card-image' src={details?.imageurl || 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt='persona'/>
                            <p   className='card-title'>{details?.quotes} </p>
                            <p className='card-quote'> I always want to learn more</p>
                            <p className='card-timestamp'>Last updated :1 min ago</p>
                        </div>
                    ))
                }

                <div className='card' onClick={()=>addPersonaDetails()}>
                    <img className='card-image' src='https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='card'/>
                    <p className='card-title'>Create card</p>
                    <p className='card-quote'>Write your own quote</p>
                    <p className='card-timestamp'>Last updated :</p>
                </div>


            </div>
            
        </div>

    </div>
  )
}
