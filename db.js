require('dotenv').config();
const { default: mongoose } = require("mongoose");
const DBNAME = process.env.DB_NAME || 'test';
// const DBUSER = process.env.DBUSER;
// const DBPASS = process.env.DBPASS;
const DB_URL = `mongodb://localhost:27017/${DBNAME}`;
// console.log(DBNAME)

// const MONGO_URL = process.env.MONGO_URL;
const dbConnection = async () => {
    await mongoose.connect( DB_URL,{useNewUrlParser:true, useUnifiedTopology:true} );
    console.log('db connection success')

}
// module.exports = dbConnection;
module.exports =  dbConnection;