const { ApolloError } = require("apollo-server-express");
const { pool } = require("../../db/connectDB")
const {GraphQLError} =require("graphql")

const userResolvers={

    Query:{
        getUser:async(_,{email,password})=>{
            try{
                console.log(">>>>>>>>>");
                
                console.log(email,password);
                
                const res=await pool.query(
                    "SELECT name, id, password from users where email=$1",
                    [email]
                )
                console.log(">>>>>",res.rowCount);
                
                if(res.rowCount===0)  throw new GraphQLError("invalid email",{
                    extensions:{
                        code:"INVALID_EMAIL",
                        emailError:true
                    }})

                const checkPassword=res.rows[0].password

                if(checkPassword!==password) throw new GraphQLError("invalid password",{
                    extensions:{
                        code:"INVALID_PASSWORD",
                        passworError:true
                    }})
                
                return res.rows[0]
            }catch(err){
                if(err instanceof GraphQLError){
                    console.log(err);
                    throw err
                }
                else{
                    console.log(err);
                    throw new GraphQLError("Internal server error",{
                        extensions:{
                            code :"INTERNAL_SERVER_ERROR",
                            detatils:err.stack || null
                        }
                    })

                }
            }
        }
    },

    Mutation:{

        createUser : async(_,{name,password,email})=>{
            try{
                const existingUser=await pool.query("SELECT * FROM users WHERE email=$1",
                    [email]
                )

                if(existingUser.rowCount>0) throw new Error("user already have an account")

                const res=await pool.query(
                    "INSERT INTO users(name,password,email) VALUES ($1,$2,$3) RETURNING name, email, id, created_at",
                    [name,password,email]
                )

                console.log(">>>>> register",res.rows[0]);
                const {created_at, ...reso} = res?.rows[0]
                console.log('reso', reso)
                return {...reso, "metadata": {}}
            }catch(err){
                console.log("error from create user resolver");
                console.log(err.message);
                throw new Error(err.message)
            }
        }

    }
}

module.exports=userResolvers

    
