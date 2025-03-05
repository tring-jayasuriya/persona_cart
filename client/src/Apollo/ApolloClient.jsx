import {ApolloClient,InMemoryCache} from "@apollo/client"

export const Client= new ApolloClient({
    uri:"http://localhost:8080/graphql",
    cache:new InMemoryCache()
})
