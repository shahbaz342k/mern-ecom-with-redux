require('dotenv').config();
const mongoose  = require("mongoose");

// const DB_URL = `mongodb://localhost:27017/${DBNAME}`;
// console.log(DBNAME)
const DB_URL = process.env.DATABASE_URL;
// const DB_URL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.cfhzu.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
// const DB_URL = `mongodb+srv://shahbaz3331:UvJwhGwVLuSZVkK7@cluster0.cfhzu.mongodb.net/?mernappdb=true&w=majority`;
// const DB_URL = 'mongodb+srv://shahbaz3331:UvJwhGwVLuSZVkK7@cluster0.cfhzu.mongodb.net/?mearn_app=true&w=majority'

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


