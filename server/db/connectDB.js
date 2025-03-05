const {Pool} =require("pg")

const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"persona",
    password:"1234",
    port:5432
})

const connectDB=async()=>{

    try{
        await pool.query("SELECT 1");
        console.log("database connected to the server");
    }catch(err){
        console.log("error in database connection");
        console.log(err.message);
    }

    pool.on("error",()=>{
        console.error("database connection error ")
        process.exit(1)
    })
   
}

module.exports={connectDB,pool}