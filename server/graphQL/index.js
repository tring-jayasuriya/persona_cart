const {mergeTypeDefs,mergeResolvers}=require("@graphql-tools/merge")

const userDefs = require("./typedefs/userDefs")
const cardDefs = require("./typedefs/cardDefs")

const userResolvers = require("./resolvers/userResolvers")
const cardResolvers = require("./resolvers/cardResolvers")


const typeDefs=mergeTypeDefs([userDefs,cardDefs])
const resolvers=mergeResolvers([userResolvers,cardResolvers])

module.exports={typeDefs,resolvers}
