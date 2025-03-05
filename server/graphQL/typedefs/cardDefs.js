const {gql} = require("apollo-server-express")

const cardDefs=gql`
    type Card{
        quotes:String
        description:String
        motivation:String
        pain_points:String
        jobs:String
        activities:String
        imageurl:String
        id:Int
        uuid:String
    }

    input CardInput{
        quotes:String
        description:String
        motivation:String
        pain_points:String
        jobs:String
        activities:String
        imageurl:String
        uuid:String
        id:Int
    }

    type Query{
        getCards(id:Int!):[Card]
    }

    type Mutation{
        createCard(cardDetails:CardInput):Card
        updateCard(cardDetails:CardInput):Card
        deleteCard(uuid:String!):Card
    }
`

module.exports=cardDefs