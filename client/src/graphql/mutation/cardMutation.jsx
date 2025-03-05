import { gql } from "@apollo/client";


export const CREATE_CARD=gql`
    mutation createCard($cardDetails:CardInput){
        createCard(cardDetails:$cardDetails){
            quotes
            uuid
        }
    }
`

export const UPDATE_CARD=gql`
    mutation updateCard($cardDetails:CardInput){
        updateCard(cardDetails:$cardDetails){
            quotes
            uuid
        }
        
    }
`


export const DELETE_CARD=gql`
    mutation deleteCard($uuid:String!){
        deleteCard(uuid:$uuid){
            quotes
        }
    }
` 

