import React from 'react'
import { useLocation } from 'react-router-dom'
import BillingSection from './BillingSection';
import ProductAndPaymentSection from './ProductAndPaymentSection';

const CheckoutComponent = () => {
   const location =  useLocation();
  //  console.log(location)
  return (
    <div>
        <div className="container">
            <div className="row g-5 mt-4">
                <BillingSection />
                <ProductAndPaymentSection totalPrice = {location.state.totalPrice}/>        
            </div>
        </div>
    </div>
  )
}

export default CheckoutComponent