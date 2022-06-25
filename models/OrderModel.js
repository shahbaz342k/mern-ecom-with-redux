const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema( {
    userId: {
        type:String,
        required:true
    },
    paymentType: {
        type:String,
        required:true,
    },
    paymentId: {
        type:String
    },
    paymentTotal:{
        type:Number,
        required:true
    },
    promoCode:{
        type:String,
    },
    shippingPrice:{
        type:Number,
        required:true
    },
    shippingMethod:{
        type:String,
        required:true
    },
    address1: {
        type:String,
        required:true
    },
    address2: {
        type:String,
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    }
},{timestamps:true});
const OrderModel = mongoose.model('order', OrderSchema);
module.exports = OrderModel;