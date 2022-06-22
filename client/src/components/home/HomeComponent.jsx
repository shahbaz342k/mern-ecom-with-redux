import React from 'react'
import ProductList from '../products/ProductList'
import Slider from './Slider'
import useFetch from './../../hooks/useFetch';
const url = 'http://localhost:5000/api/products'
const HomeComponent = () => {
  const {data, loading, error} = useFetch(url);

  const products = [
    {
        _id:1,
        name:'Oppo 11 Net pro',
        price:234
    },
    {
        
        _id:2,
        name:'Samsung Note15',
        price:100
    },
    {
        
        _id:3,
        name:'IPhone 16 plus',
        price:444
    }
];
  return (
    <div>
      {/* <Slider /> */}
      {/* cards */}
      <div className='container'>
        <div className='d-flex flex-wrap'>
          { loading ? 'loading...' : data.map( (product) => <ProductList product={product} key={product._id} /> )}
        </div>
      </div>
    </div>
  )
}

export default HomeComponent