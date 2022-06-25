import e from 'cors';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addBillingDetails } from './../../redux/actions/billingDetailsActions';
import { useEffect } from 'react';

const BillingSection = () => {
    const {user} = useSelector( (state) => state.user);
    // console.log('res st', user)
    const [billingDetails, setBillingDetails] = useState({
        address:null,
        address2:null,
        country:null,
        bstate:null,
        zip:null,
    });

    const handleChange = (e) => {
        e.preventDefault()
        // setBillingDetails( (prev) => ({...prev, [e.target.id]:e.target.value}) )
        setBillingDetails( (prev) => ({...prev, [e.target.id]:e.target.value}) )
    }
    const dispatch = useDispatch();
    const handleSubmit = (e)=> {
        e.preventDefault();
        // console.log(billingDetails)
        
    }
    useEffect( () => {
        dispatch(addBillingDetails(billingDetails));
    },[billingDetails])
  return (
    <>
    <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <div className="needs-validation" novalidate>
            <div className="row g-3">
                <div className="col-sm-12">
                    <label for="Name" className="form-label"> Name</label>
                    <input type="text" className="form-control" id="Name" placeholder="" value={user.name} />
                    
                </div>

                <div className="col-12">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={user.email} />
                    {/* <div className="invalid-feedback">Please enter a valid email address for shipping updates.</div> */}
                </div>

                <div className="col-12">
                    <label for="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" onChange={(e) => handleChange(e)} placeholder="1234 Main St" />
                </div>

                <div className="col-12">
                    <label for="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                    <input type="text" className="form-control" id="address2" onChange={(e) => handleChange(e)} placeholder="Apartment or suite" />
                </div>

                <div className="col-md-5">
                    <label for="country" className="form-label">Country</label>
                    <select className="form-select" id="country" onChange={(e) => handleChange(e)} required>
                        <option selected value="">Choose country</option>
                        <option>United States</option>
                        <option>India</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label for="state" className="form-label">State</label>
                    <select className="form-select" id="bstate" onChange={(e) => handleChange(e)} required>
                        <option value="" selected>Choose...</option>
                        <option>California</option>
                        <option>Delhi</option>
                    </select>
               
                </div>

                <div className="col-md-3">
                    <label for="zip" className="form-label">Zip</label>
                    <input type="text" className="form-control" onChange={(e) => handleChange(e)} id="zip" placeholder="" />
                    {/* <div className="invalid-feedback">
                        Zip code required.
                    </div> */}
                </div>
            </div>

            <hr className="my-4" />

            {/* <div className="form-check">
                <input type="checkbox" className="form-check-input" id="same-address" />
                <label className="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
            </div>

            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="save-info" />
                <label className="form-check-label" for="save-info">Save this information for next time</label>
            </div> */}
            {/* <button onClick={(e) => handleSubmit(e)}>Add Adress</button> */}
        </div>
    </div>
    </>
  )
}

export default BillingSection