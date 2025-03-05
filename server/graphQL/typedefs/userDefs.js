const {gql}=require('apollo-server-express')


const userDefs=gql`

    type User{
        id:ID!
        name:String!
        email:String!
        password:String!
        created_at:String
    }

    type Query{
        getUser(email:String!,password:String!):User
    }

    type Mutation{
        createUser(name:String!, password:String!, email:String!):User
    }

`

module.exports=userDefs