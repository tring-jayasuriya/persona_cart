const express=require("express")
const cors=require('cors')
const app=express()

const {connectDB} = require("./db/connectDB")
const { ApolloServer } = require("apollo-server-express")
const {typeDefs,resolvers}=require('./graphQL/index')

const port=8080

app.use(cors())
app.use(express.json())

app.get("/api1",(req,res,next)=>{
    while(true){
       console.log("log from api1");
       
    }
    next()
})

app.get("/api2",(req,res)=>{
   res.send("hello")
})


const startServer=async()=>{

    try{
        
        const server=new ApolloServer({typeDefs,resolvers})
        await server.start()
        server.applyMiddleware({app})

        await connectDB()

        app.listen(8080,()=>{
            console.log(`server is running in the port ${port}, ${server.graphqlPath}`);
    })

    }catch(err){
        console.log("error from index.js start server");
        console.log(err.message);
    }
        
}

startServer()


