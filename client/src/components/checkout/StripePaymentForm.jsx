import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import './stripeform.css'
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from './../../redux/actions/cartActions';
const StripePaymentForm = (props) => {
    const {totalPrice} = props;
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const result = useSelector((state) => state.cart);
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
        console.log(response)
        if( response.paymentIntent.status === "succeeded" ){
            
            alert(`Order Placed`)
            // setCart([]);
            // window.localStorage.setItem('cart', 'null');
            dispatch(clearCart())

            navigate('/thank-you',{state:{pyamentId:response.paymentIntent.payment_method}})
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