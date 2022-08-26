require('dotenv').config();
const mongoose  = require("mongoose");

// const DB_URL = `mongodb://localhost:27017/${DBNAME}`;
// console.log(DBNAME)
const DB_URL = process.env.DATABASE_URL;


const dbConnection = async () => {
   
        await mongoose.connect(
            DB_URL,
            async(err)=>{
                if(err) throw err;
                console.log("conncted to db")
            }
        )

}

// module.exports = dbConnection;
module.exports =  dbConnection;


