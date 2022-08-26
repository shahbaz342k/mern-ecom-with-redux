import React from 'react'
import ProductList from './../components/products/ProductList';
// import useFetch from './../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { porductList } from '../redux/actions/productActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const url = 'http://localhost:5000/api/products'

const Products = () => {
    // const {data, loading, error} = useFetch(url);
    const [pageLoading, setPageLoading] = useState(true);
    const [test, setTest] = useState(false);
    const productSRes = useSelector( (state) => state.products);
    // console.log(productSRes)
    const dispatch = useDispatch();

    const productsCalling = (e) => {
        e.preventDefault()
        setTest(true);
        // dispatch( porductList() )
    }
    
    // calling product list redux action where we use api calling with saga
    useEffect( () => {
      dispatch( porductList() )
      setPageLoading(false)
      console.log('component did mount')
    },[])


    useEffect( () => {
      if( test ){
        console.log('component did update')
      }
      
    },[test])

    useEffect(() => {
      // componentWillUnmount
      return () => {
         // Your code here
      }
    }, [test]);
    

    return (
     
      <div>
         { true ? console.log('render'): ''}
        {/* <Slider /> */}
        {/* cards */}
        <div className='container'>
            <h2 className='mt-4'>All Products</h2>
            <button onClick={ (e) => productsCalling(e) }>Sohow Produts </button>
          <div className='d-flex flex-wrap'>
            { pageLoading ? 'loading...' : productSRes.map( (product) => <ProductList product={product} key={product._id} /> )}
          </div>
        </div>
      </div>
    )
}

export default Products