import React, { useContext, useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { userContext } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

export const Personas = () => {

    const [image,setImage]=useState(null)
    const [personaInfo,setPersonaInfo]=useState(null)
    const {cardInfo,setCardInfo}=useContext(userContext)
    const [cardIndex,setCardIndex]=useState(-1)
    const params=useParams();
    const navigate=useNavigate()
    
    
    const handleInfo=(e)=>{
        setPersonaInfo((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
            uuid:params.id
        }))
    }

    useEffect(()=>{

        let index=cardInfo.findIndex((data)=>data.uuid===params.id)
        setCardIndex(index)
        setPersonaInfo(cardInfo[index])

    },[])


    const handleClose=()=>{
        navigate('/')
    }


    const handleUpdatePersona=()=>{

        if(personaInfo==null) return navigate("/")
      
        if(cardIndex!==-1){
            const duplicate=[...cardInfo]
            duplicate[cardIndex]=personaInfo;
            setCardInfo(duplicate)
            toast.success("persona card updated successfully ")
        }
        else{
            setCardInfo((prev)=>([...prev,personaInfo]))
            toast.success("persona card added successfully")
        }

            navigate("/")

        
    }
    

    const handleImage=(e)=>{
        const file=e.target.files[0]
        if(file){
            const imageUrl=URL.createObjectURL(file)
            setImage(imageUrl)
            setPersonaInfo((prev)=>({
                ...prev,
                imageUrl:imageUrl
            }))
        }
    }

    
    const handleDelete=()=>{
        if(cardIndex===-1) navigate('/')

        else{

            const filterCard= cardInfo.filter((data)=>(
                data.uuid!==params.id
            ))
            setCardInfo(filterCard)

            toast.error("persona card deleted")

            navigate('/')
        }
    }


  return (
    <div className='personas-main-container'>
            <img className='personas-img' src={personaInfo?.imageUrl || image || 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'}/>

            <div className='person-image-section'>

                <p className='persona-name'>Persona Name</p>

                <div>
                    <label className='edit-image-label' htmlFor='edit-image' >Edit Image</label>
                    <input  onChange={handleImage}  id='edit-image' accept='image/*' className='file-logo' type='file'/>
                </div>
                
                
            </div>
            <div className='personas-grid-wrapper'>
                <div className='personas-grid-container'>
                    <div>
                        <p className='persona-title'>Notable Quote</p>
                        <input value={personaInfo?.quote} name='quote' onChange={handleInfo} className='personas-input' type='text' placeholder='Enter a quote that identifies the persona'/>
                    </div>

                    <div>
                        <p className='persona-title'>Description</p>
                        <input value={personaInfo?.description} name='description' onChange={handleInfo} className='personas-input' type='text' placeholder='Enter a general description/bio about the persona'/>
                    </div>

                    <div className='persona-title'>
                        <p className='persona-title'>Attitudes / motivation</p>
                        <input value={personaInfo?.motivation} name='motivation' onChange={handleInfo} className='personas-input' type='text' placeholder='What drives and incenties the porsong toner deleget your What mindset does the persone bovet'/>
                    </div>

                    <div>
                        <p className='persona-title'>Pain points</p>
                        <input value={personaInfo?.pain_points} name='pain_points' onChange={handleInfo} className='personas-input' type='text' placeholder='What are the biggest challenges that the Rersona faces in their inh?'/>
                    </div>

                    <div>
                        <p className='persona-title'>Jobs / Needs </p>
                        <input value={personaInfo?.jobs} name='jobs' onChange={handleInfo} className='personas-input' type='text' placeholder='What are the person functional sociol and emotional needs to be successful of their'/>
                    </div>

                    <div>
                        <p className='persona-title'>Activities</p>
                        <input value={personaInfo?.activities} name='activities' onChange={handleInfo} className='personas-input' type='text' placeholder='What does the persona like to do in theit free time?'/>
                    </div>
                   
                </div>

                <div className='persona-footer'>
                    <div onClick={handleDelete} className='persona-delete'>Delete</div>
                    <div className='persona-update-section'>
                        <p onClick={handleClose} className='persona-close-btn'>close</p>
                        <button onClick={handleUpdatePersona} className='update-persona-btn' >Update Persona</button>
                    </div>
                </div>

            </div>


    </div>
  )
}
