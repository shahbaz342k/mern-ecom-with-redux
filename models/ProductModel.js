const  mongoose = require("mongoose");
const ProductSchema = mongoose.Schema( {
    title:{
        type: String,
        required:true,
    },
    slug:{
        type: String,
        required:true,
        unique:true,
    },
    price:{
        type: Number,
        required:true,
    },
    brand:{
        type: String,
    },
    thumbnail:{
        type: String,
    },
    images:{
        type: [],
    },
    category:{
        type:String,
        default:'uncategorized'
    },
    description: {
        type: String
    },
    rating: {
        type: Number,
    },
    ratingCount:{
        type:Number
    }
},{timestamps:true});
const ProductModel = mongoose.model('product',ProductSchema);
module.exports = ProductModel;