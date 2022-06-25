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
    // const location =  useLocation();
    const {state} =  useLocation();
    // console.log(state)
    const productId = state.id;
    // console.log(baseAPIURL)
    const url = `${baseAPIURL}/products/${productId}`;
    const {data, loading} = useFetch(url);
    console.log(data)
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const productData = async () => {
    //     try{
    //         const {data} = await axios.get(url);
    //         console.log('pro data', data)
    //         setData(data.result);
    //         setLoading(false);
    //     }catch(err){
    //         console.log(err)
    //         setLoading(false);
    //     }
    // }
    // // console.log(data)

    // useEffect( () => {
    //     console.log('use Effect run')
    //     productData();
    //     // console.log(data)
    //     setLoading(true);
    // }, []);

  return (
    <div className='container mt-4'>
        {loading ?  <Loader /> : ''}
        {data.length && 
            // <div className='row'>
            //     <div className='col-4'>
            //         <div className='pImg'>
            //             <img src={data[0].image} className='w-100' alt={data[0].title} />
            //         </div>
            //     </div>
            //     <div className='col-8'>
            //         <div className='pTitle'>
            //             <h2>{data[0].title}</h2>
            //         </div>
            //         <div className='pCat mb-4'>
            //             <h6><span>Category :</span> {firstLetterUpperCase(data[0].category)}</h6>
            //         </div>
            //         <AddToCart product={data[0]}/>
            //     </div>
            // </div> 
            <div class="container mt-5 mb-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-10">
                        <div class="card">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="images p-3">
                                        <div class="text-center p-4"> 
                                            {/* <img id="main-image" src="https://i.imgur.com/Dhebu4F.jpg" width="250" /> */}
                                            <img id="main-image" src={data[0].image} alt={data[0].title} />
                                        </div>
                                        <div class="thumbnail text-center"> 
                                        {/* <img onclick="change_image(this)" src="https://i.imgur.com/Rx7uKd0.jpg" width="70" /> 
                                        <img onclick="change_image(this)" src="https://i.imgur.com/Dhebu4F.jpg" width="70" />  */}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="product p-4">
                                        

                                        <div class="mt-4 mb-3"> 
                                            <h5 class="text-uppercase">{data[0].title}</h5>
                                            <div class="price d-flex flex-row align-items-center"> 
                                                <span class="act-price">${data[0].price}</span>
                                                <div class="ml-2 mx-2"> 
                                                    <small class="dis-price mx-2">$249</small> 
                                                    <span>40% OFF</span> 
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p class="about">
                                            {data[0].description}
                                        </p>
                                        
                                        <div class="mt-4"> 
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