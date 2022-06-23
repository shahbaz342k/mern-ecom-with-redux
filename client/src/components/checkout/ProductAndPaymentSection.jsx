import { Elements } from '@stripe/react-stripe-js';
import { cartCount } from './../Helper/cartHelper';
import StripePaymentForm from './StripePaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './stripeform.css'

const stripePromise = loadStripe('pk_test_rOAwtz1LVC9CERxJe7qwQCiF00IwAaM679');
const ProductAndPaymentSection = (props) => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [paymentSelect, setPaymentSelect] = useState('cod');
    
    const checkoutPyament = (event) => {
        // alert(paymentSelect)
        if( paymentSelect == 'stripe' ){
            setModalOpen(true)
            setShowPaymentForm(true)
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
  return (
    <>
      <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{cartCount()}</span>
            </h4>
            <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                <h6 className="my-0">Product name</h6>
                <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$12</span>
            </li>
            
            
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
                    <input type="radio" name="pm" id="cod" className="form-check-input" onChange={(e) => codSelect(e)} />
                    <label for="cod">COD</label>
                </div>
                <div className='form-check'>
                    <input type="radio" name="pm" id="stripe" className="form-check-input" onChange={(e) => stripeSelect(e)} />
                    <label for="stripe">Stripe</label>
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
    </>
  )
}

export default ProductAndPaymentSection