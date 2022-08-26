import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';
import Loader from '../loader/Loader';
import useFetch from './../../hooks/useFetch';
import { useEffect } from 'react';
import { useState } from 'react';
import { firstLetterUpperCase } from './../Helper/common';
import AddToCart from '../cart/AddToCart';
import './productsingle.css'; 

const baseAPIURL = process.env.REACT_APP_API_URL
const ProductSingle = () => {

    const {state} =  useLocation();
    const productId = state.id;
    const url = `${baseAPIURL}/products/${productId}`;
    const {data, loading} = useFetch(url);
    // console.log(data)
   

    

  return (
    <div className='container mt-4'>
        {loading ?  <Loader /> : ''}
        {data.length && 
           
            <div className="container mt-5 mb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="images p-3">
                                        <div className="text-center p-4"> 
                                            {/* <img id="main-image" src="https://i.imgur.com/Dhebu4F.jpg" width="250" /> */}
                                            <img id="main-image" src={data[0].images[0]} alt={data[0].title} />
                                        </div>
                                        <div className="thumbnail text-center"> 
                                        {/* <img onclick="change_image(this)" src="https://i.imgur.com/Rx7uKd0.jpg" width="70" /> 
                                        <img onclick="change_image(this)" src="https://i.imgur.com/Dhebu4F.jpg" width="70" />  */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product p-4">
                                        

                                        <div className="mt-4 mb-3"> 
                                            <h5 className="text-uppercase">{data[0].title}</h5>
                                            <div className="price d-flex flex-row align-items-center"> 
                                                <span className="act-price">${data[0].price}</span>
                                                <div className="ml-2 mx-2"> 
                                                    <small className="dis-price mx-2">$249</small> 
                                                    <span>40% OFF</span> 
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p className="about">
                                            {data[0].description}
                                        </p>
                                        
                                        <div className="mt-4"> 
                                            <AddToCart product={data[0]}/> 
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        }
    </div>
  )
}

export default ProductSingle