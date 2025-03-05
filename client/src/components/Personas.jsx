import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'
import { MdDelete } from "react-icons/md";
import { useMutation } from '@apollo/client';
import { CREATE_CARD, DELETE_CARD, UPDATE_CARD } from '../graphql/mutation/cardMutation';


export const Personas = () => {

    const [image,setImage]=useState(null)
    const [personaInfo,setPersonaInfo]=useState(null)
    const {cardInfo,setCardInfo,user}=useContext(userContext)
    const [cardIndex,setCardIndex]=useState(-1)
    const params=useParams();
    const navigate=useNavigate()
    const [createCard]=useMutation(CREATE_CARD,{fetchPolicy:"no-cache"})
    const [updateCard]=useMutation(UPDATE_CARD,{fetchPolicy:"no-cache"})
    const [deleteCard]=useMutation(DELETE_CARD,{fetchPolicy:"no-cache"})

    const handleInfo=(name,value)=>{
        
        setPersonaInfo((prev)=>({
            ...prev,
            [name]:value,
            uuid:params.id,
            id:parseInt(user.id,10)
        }))
    }
    
    console.log(personaInfo);
    

    useEffect(()=>{
        
        let index=cardInfo.findIndex((data)=>data.uuid===params.id)
        console.log("check index>>",index);
        
        setCardIndex(index)
        
        setPersonaInfo(cardInfo[index])

    },[])

    console.log("card index>>>>>",cardIndex);

    const handleClose=()=>{
        navigate('/')
    }

    const handleUpdatePersona=async()=>{

        if(personaInfo===undefined) return navigate("/")
        
        try{

            if(cardIndex!==-1){

                console.log("log from update card info");
                console.log(personaInfo);

                let filteredPersona={...personaInfo}
                delete filteredPersona?.__typename
                
                const {data,error,loading}=await updateCard({
                    variables:{cardDetails:filteredPersona},
                    fetchPolicy:"no-cache"
                })

                console.log(">>>>>>> update card",data.updateCard);
                
                const duplicate=[...cardInfo]
                duplicate[cardIndex]=personaInfo;
                setCardInfo(duplicate)
                toast.success("persona card updated successfully ")
            }
            else{
                
                console.log("new card creation");

                const {data}=await createCard({
                    variables:{cardDetails:personaInfo},
                    fetchPolicy:"no-cache"
                })
    
                console.log(">>>>>>",data.createCard);
    
                setCardInfo((prev)=>([...prev,personaInfo]))
                toast.success("persona card added successfully")
            }   

            navigate("/") 
        }catch(err){
            console.log("err from persona ",err);
            
        }
        
    }
    

    const handleImage=(e)=>{
        const file=e.target.files[0]
        if(file){

            if(file.size > 5*1024*1024){
                toast.error("file size should be less than 5 mb")
                return
            }

            const imageUrl=URL.createObjectURL(file)
            setImage(imageUrl)
            setPersonaInfo((prev)=>({
                ...prev,
                imageurl:imageUrl
            }))
        }
    }

    
    const handleDelete=async()=>{
        if(cardIndex===-1) navigate('/')

        else{

            const {data,loading,error}=await deleteCard({
                variables:{uuid:personaInfo.uuid},
                fetchPolicy:"no-cache"
            })

            console.log("log from delete card ", data?.deleteCard, loading?.deleteCard, error?.deleteCard);
            

            const filterCard= cardInfo.filter((data)=>(
                data.uuid!==params.id
            ))
            setCardInfo(filterCard)

            toast.error("persona card deleted")

            navigate('/')
        }
    }

    const handleDeleteImage=()=>{
        setPersonaInfo((prev)=>({
            ...prev,
            imageurl:null
        }))
    }


  return (
    <div className='personas-main-container'>
            <img className='personas-img' src={personaInfo?.imageurl  || 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt='preview' />

            <div className='person-image-section'>

                <p className='persona-name'>{user?.name || "Persona Name"}</p>

                <div className='edit-inner-section'>
                    <label className='edit-image-label' htmlFor='edit-image' >Edit Image</label>
                    <input  onChange={handleImage}  id='edit-image' accept='image/*' className='file-logo' type='file'/>
                    {personaInfo?.imageurl && <MdDelete onClick={handleDeleteImage}  className='delete-icon'/> }
                    
                </div>

                
                
            </div>

            <div className='personas-grid-wrapper'>
                <div className='personas-grid-container'>
                    <div>
                        <p className='persona-title'>Notable Quote</p>
                        <input value={personaInfo?.quotes} name='quotes' onChange={(e)=>handleInfo(e.target.name,e.target.value)} className='personas-input' type='text' placeholder='Enter a quote that identifies the persona'/>
                    </div>

                    <div>
                        <p className='persona-title'>Description</p>
                        <input value={personaInfo?.description} name='description' onChange={(e)=>handleInfo(e.target.name,e.target.value)} className='personas-input' type='text' placeholder='Enter a general description/bio about the persona'/>
                    </div>

                    <div className='persona-title'>
                        <p className='persona-title'>Attitudes / motivation</p>
                        <input value={personaInfo?.motivation} name='motivation' onChange={(e)=>handleInfo(e.target.name,e.target.value)} className='personas-input' type='text' placeholder='What drives and incenties the porsong toner deleget your What mindset does the persone bovet'/>
                    </div>

                    <div>
                        <p className='persona-title'>Pain points</p>
                        <ReactQuill theme='snow' value={personaInfo?.pain_points}  name='pain_points' onChange={(data)=>handleInfo("pain_points",data)} />   
                    </div>

                    <div>
                        <p className='persona-title'>Jobs / Needs </p>
                        <ReactQuill theme='snow' value={personaInfo?.jobs}  name='Jobs' onChange={(data)=>handleInfo("jobs",data)}/> 
                    </div>

                    <div>
                        <p className='persona-title'>Activities</p>
                        <ReactQuill theme='snow' value={personaInfo?.activities}   name='Activities' onChange={(data)=>handleInfo("activities",data)}/>
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
