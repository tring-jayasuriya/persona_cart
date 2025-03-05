import { gql } from "@apollo/client";

export const CREATE_USER=gql`
    mutation createUser($name:String!,$password:String!,$email:String!){
        createUser(name:$name,password:$password,email:$email){
            name
            email
            created_at
        }
    }   
` 