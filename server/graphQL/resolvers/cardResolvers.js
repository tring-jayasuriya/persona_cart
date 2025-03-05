const { pool } = require("../../db/connectDB");
const { Query } = require("./userResolvers");


const cardResolvers={

    Mutation:{
        createCard:async(_,{cardDetails})=>{
            const {quotes,description,motivation,pain_points,jobs,activities,imageurl,uuid,id}=cardDetails

            console.log("create card log");
            console.log(">>>>>>>>>>>",cardDetails)
            
            try{
                const res=await pool.query(
                    "INSERT INTO cards(quotes,description,motivation,pain_points,Jobs,Activities,imageUrl,uuid,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING quotes,uuid",
                    [quotes,description,motivation,pain_points,jobs,activities,imageurl,uuid,id]
                )
                
                console.log(res)
                return res.rows[0]
            }catch(err){
                console.log("error from create card resolver");
                console.log(err);
            }

        },

        updateCard:async(_,{cardDetails})=>{
            const {quotes,description,motivation,pain_points,jobs,activities,imageurl,uuid,id}=cardDetails

            console.log("log from update card>>>>>>>>>>");
            

            try{
                // const isCardAvailable=await pool.query()

                console.log("update card details resolver",cardDetails);
                

                const res=await pool.query(
                    "UPDATE cards SET quotes=$1, description=$2, motivation=$3, pain_points=$4, Jobs=$5, Activities=$6, imageUrl=$7 WHERE uuid=$8 RETURNING quotes, user_id",
                    [quotes,description,motivation,pain_points,jobs,activities,imageurl,uuid]
                )
                return res.rows[0]

            }catch(err){
                console.log("error from update user resolver",err);
            }

        },

        deleteCard:async(_,{uuid})=>{

            try{
                console.log("log from delete card ");
                
                const res=await pool.query(
                    "DELETE FROM cards WHERE uuid=$1 RETURNING quotes",
                    [uuid]
                )
                console.log(res);
                return res.rows[0]
            }catch(err){
                console.log("error from delete card",err);
                
            }
            
        }
    },

    Query:{
        getCards:async(_,{id})=>{

            console.log("log from get cars resolver");
            

            try{
                const res=await pool.query(
                    "SELECT * FROM cards WHERE user_id=$1",
                    [id]
                )

                console.log(res.rows);
                return res.rows

            }catch(err){
                console.log("error from get cards resolver ",err);
                
            }

        }
    }
}

module.exports=cardResolvers