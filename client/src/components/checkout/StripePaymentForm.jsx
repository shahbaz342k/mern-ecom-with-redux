import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import './stripeform.css'
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from './../../redux/actions/cartActions';
import axios from 'axios';
import { convertCartProductsToArrOfObjects } from "../Helper/common";
import { userOrderSuccess } from './../../redux/actions/orderActions';
const StripePaymentForm = (props) => {
    
    const {totalPrice} = props;
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const result = useSelector((state) => state.cart);
    const billingRes = useSelector((state) => state.billing_details);
    // convertCartProductsToArrOfObjects(result.cart)
    // console.log('billing detal', billingRes)
          
    
    /*


        products = [
            {
                productId:'',
                productQty:'',
            },
            {
                productId:'',
                productQty:'',
            }
            
        ]
    */

    const {user} = useSelector((state) => state.user);
    // console.log(user)
    const dispatch = useDispatch();

    // STEP 1: create a payment intent and getting the secret
    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: totalPrice * 100, description: 'For Testing' }),
        })
        .then(res => res.json())
        .then((data) => {
            
            setClientSecret(data.clientSecret);  // <-- setting the client secret here
        });
    }, []);

    const orderAdd = async (url, payload) => {
        try {
            const resp = await axios.post(url, payload);
            // console.log(resp)
            dispatch(userOrderSuccess(resp.data.result.order));
        } catch (err) {
            console.log(err)
        }
        
    }
  
    // STEP 2: make the payment after filling the form properly
    const makePayment = async (e) => {
        e.preventDefault();
        const response = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                // hidePostalCode: true,
                billing_details: {
                    name:user.name,
                    email:user.email,
                },
            },
            // receipt_email: 'jhondoe@test.com',
            // name: 'John Doe',
          

        });
        // console.log(response)

        if( response.paymentIntent.status === "succeeded" ){
            
            // get all cart products and qty
            

            orderAdd('http://localhost:5000/api/order',{
                userId:user._id,
                paymentType:'online',
                paymentTotal:totalPrice,
                shippingPrice:5,
                shippingMethod:'Basic shipping',
                address1:billingRes.address,
                country:billingRes.country,
                state:billingRes.bstate,
                zip:billingRes.zip,
                products:convertCartProductsToArrOfObjects(result.cart)
            })
            alert(`Order Placed`);
            // setCart([]);
            // window.localStorage.setItem('cart', 'null');
            dispatch(clearCart())

            navigate('/thank-you')
		    // setProducts({})
        }
        
    }

    
 return (
    <form id="payment-form" onSubmit={makePayment}>
        <CardElement id="card-element"  />
        <button id="submit" className="pay-now"> Pay Now </button>
    </form>
    
 );
}

export default StripePaymentForm