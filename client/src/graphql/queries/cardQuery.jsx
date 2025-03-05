import { gql } from "@apollo/client";


export const GET_CARDS=gql`
    query getCards($id:Int!){
        getCards(id:$id){
            quotes
            description
            motivation
            pain_points
            imageurl
            jobs
            activities
            uuid
        }
    }
`