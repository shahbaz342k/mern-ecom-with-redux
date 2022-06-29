const mongoose = require('mongoose');

const Order = require('../models/OrderModel');
const OrderDetails = require('../models/OrderDetailsModel');
const ProductModel = require('../models/ProductModel');

const add = async (req, res, next) =>{

    // object destructring 
    const {userId,paymentType,paymentTotal,shippingPrice,shippingMethod,address1,country,state,zip, products} = req.body;
    // res.json(products[0].productId);
    // let orderDetailsByOrderid = await OrderDetails.find({orderId:'62b5a8a6a9b33be7972a7c8e'}); 

    //     // const orderDetailsByOrderid = await OrderDetails.find({orderId:'62b59d319deded5a7f260038'}); 
    //     res.json(orderDetailsByOrderid)
    // console.log(req.body)
    // res.json(req.body);
    // return;
    
    try{
        const order = new Order({userId,paymentType,paymentTotal,shippingPrice,shippingMethod,address1,country,state, zip});
        const order_document = await order.save(); 
        let orderID=order_document._id;

        products.forEach(async (product) => {
            const prod = await ProductModel.findOne({_id:product.productId});
            // res.json(prod);
            // return;
            const orderDetail = new OrderDetails({
                orderId:orderID,
                productId: product.productId,
                productQty:product.productQty,
                productPrice:prod.price
            });
            await orderDetail.save();
            // orderDetailArr.push(orderDetail_document)
        });
        
        // let orderDetailsByOrderid = await OrderDetails.find({orderId:'62b5a8a6a9b33be7972a7c8e'}); 

         let orderDetailsByOrderid = await OrderDetails.find({orderId:orderID}); 
        // res.json(orderDetailsByOrderid)
        console.log(orderDetailsByOrderid)
        res.status(201).json({
            result:{
                order:order_document,
                orderMeta:orderDetailsByOrderid,
            },
            success:true,
        })

    }catch(err){
        next(err)
    }
}

const read = async (req, res, next) =>{

     
    try{
        const orders = await Order.find().sort({_id:-1});
        res.status(201).json({
            result:orders,
            success:true,
        })

    }catch(err){
        next(err)
    }
}

const destroy = async (req, res, next) =>{

     
    try{
        await Order.deleteMany();
        await OrderDetails.deleteMany();
        res.status(200).json({
            result:'deleted',
            success:true,
        })

    }catch(err){
        next(err)
    }
}
module.exports = { add, read, destroy }