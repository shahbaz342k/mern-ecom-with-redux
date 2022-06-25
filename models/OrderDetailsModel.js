const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema( {
    orderId: {
        type:String,
        required:true
    },
    productId: {
        type:String,
        required:true
    },
    productQty: {
        type:String,
    },
    productPrice: {
        type:String,
        required:true
    }
},{timestamps:true});
const OrderModel = mongoose.model('orderDetail', OrderSchema);
module.exports = OrderModel;