import { Elements } from '@stripe/react-stripe-js';
import { cartCount } from './../Helper/cartHelper';
import StripePaymentForm from './StripePaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './stripeform.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { convertCartProductsToArrOfObjects } from '../Helper/common';
import Loader from './../loader/Loader';
import { useEffect } from 'react';
import { userOrderSuccess } from '../../redux/actions/orderActions';
import ProductsCart from './ProductsCart';

const stripePromise = loadStripe('pk_test_rOAwtz1LVC9CERxJe7qwQCiF00IwAaM679');
const ProductAndPaymentSection = (props) => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [loader, setLoader] = useState(false);

    const [paymentSelect, setPaymentSelect] = useState('cod');

    const result = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);
    const billingRes = useSelector((state) => state.billing_details);
    const {totalPrice} = props;
    const dispatch = useDispatch();
    const navigate  = useNavigate();

    // order add api
    const orderAdd = async (url, payload) => {
        try {
            const resp = await axios.post(url, payload);
            // console.log(resp);
            // setOid(resp.data.result.order._id);
            dispatch(userOrderSuccess(resp.data.result.order));
            // console.log(resp.data.result.order._id)
            
        } catch (err) {
            console.log(err)
            // dispatch(err.response.data.message);
        }      
    }
    
    const checkoutPyament = (event) => {
        // event.preventDefault();
        setLoader(true);
        // return;
        // if( billingRes )
        console.log(billingRes);
        // return;
        if( (billingRes.address == '' || billingRes.address == null) || 
            (billingRes.country == '' || billingRes.country == null) ||
            (billingRes.bstate == '' || billingRes.bstate == null) ||
            (billingRes.zip == '' || billingRes.zip == null)
        ){
            alert('please fill required fileds ');
            setLoader(false);
        }else{
            console.log(paymentSelect)
            if( paymentSelect == 'stripe' ){
                
                setTimeout( () => {
                    setLoader(false);
                    setModalOpen(true)
                    setShowPaymentForm(true)
                }, 1000)
                
            }else{
                setTimeout( () => {
                    setLoader(false);
                    // return;
                
                   orderAdd('http://localhost:5000/api/order',{
                        userId:user._id,
                        paymentType:paymentSelect,
                        paymentTotal:totalPrice,
                        shippingPrice:5,
                        shippingMethod:'Basic shipping',
                        address1:billingRes.address,
                        country:billingRes.country,
                        state:billingRes.bstate,
                        zip:billingRes.zip,
                        products:convertCartProductsToArrOfObjects(result.cart)
                    });
                    // res1.then((res) => console.log('res1',res))
                    // console.log('res1 ', )
                    //return;
    
                    alert(`Order Placed`);
                    dispatch(clearCart())
    
                    // navigate('/thank-you',{state:{pyamentId:oid}})
                    navigate('/thank-you')
                }, 1000)
            }
        }
       
    }
    const stripeSelect = () => {
        // console.log('stripe select')
        setPaymentSelect('stripe');
    }
    const codSelect = () => {
        setShowPaymentForm(false)
        setPaymentSelect('cod');
    }
    // useEffect( () => {
    //     console.log('cod select', paymentSelect);
    //     console.log('stripe select', paymentSelect);
    // },[])
    
  
  return (
    <>
      <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{cartCount()}</span>
            </h4>
            <ul className="list-group mb-3">
                <ProductsCart />
                <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                    </div>
                    <span className="text-success">−$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${props.totalPrice}</strong>
                </li>
            </ul>

            <div className="card p-2">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Promo code" />
                <button type="submit" className="btn btn-secondary">Redeem</button>
            </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Payment</h4>

            

            <hr className="my-4" />
            <div className="my-3">
                <div className='form-check'>
                    <input type="radio" name="pm" id="cod" checked={paymentSelect === 'cod' ? true:''} className="form-check-input" onChange={(e) => codSelect(e)} />
                    <label htmlFor="cod">COD</label>
                </div>
                <div className='form-check'>
                    <input type="radio" name="pm" id="stripe" checked={paymentSelect === 'stripe' ? true:''} className="form-check-input" onChange={(e) => stripeSelect(e)} />
                    <label htmlFor="stripe">Stripe</label>
                </div>
            </div>

            <div className="row gy-3">
                
                <button className="w-100 btn btn-primary btn-lg" onClick={() => checkoutPyament()} type="submit">Continue to checkout</button>

            </div>

            {/*  stripe payemnt form */}
            {modalOpen && 
                <div className="container">  
                    <div className='paymentWrapper'>
                        <div className='rContainer'>
                            <FontAwesomeIcon 
                                icon={faCircleXmark} 
                                className="rClose"
                                onClick={() => setModalOpen(false)}
                            />
                            <h2 className='talc'>Card Details</h2>
                            <Elements stripe={stripePromise}>
                                <StripePaymentForm totalPrice={props.totalPrice} />
                            </Elements>
                        </div>
                    </div>
                </div>
            }

            {/* {showPaymentForm && 
                <Elements stripe={stripePromise}>
                    <StripePaymentForm totalPrice={props.totalPrice} />
                </Elements>
            } */}
        </div>
        {loader ? <Loader /> : ''}  
    </>
  )
}

export default ProductAndPaymentSection