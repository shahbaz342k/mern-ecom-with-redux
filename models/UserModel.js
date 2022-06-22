const  mongoose = require("mongoose");

const USerSchema = mongoose.Schema( {
    name:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    image:{
        type: String,
        default:'https://gravatar.com/avatar/7b3789a68de2b058c9e746556fa8b61e?s=200&d=retro&r=pg'
    },
    password:{
        type: String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
const UserModel = mongoose.model('user',USerSchema);
module.exports = UserModel;