import React from 'react'
import { Link } from 'react-router-dom';
import AddToCart from '../cart/AddToCart'
import { firstLetterUpperCase } from '../Helper/common';
import './productlist.css'   
const ProductList = (props) => {
    const {product} = props;

  return (
    <div className="card mt-4" style={{width: "18rem",marginRight:"15px"}}>
      <Link to={`/product/${product.slug}`} state={{id:product._id}} className='anchorTag'>
        <img src={product.images[0]} className="card-img-top w-50 img-responsive imgProduct" alt={product.title}/>
        </Link>
        <div className="card-body">
        <Link to={`/product/${product.slug}`} state={{id:product._id}} className='anchorTag'>
          <h5 className="card-title">{product.title}</h5>
          </Link>      
          
        <p className="card-text"><b>Category: </b> { firstLetterUpperCase(product.category) }</p>
            <div className='card-btm'>
            <AddToCart product={product}/>
            <span className='productPrice'>$ {product.price} </span>
            </div>
        </div>
    </div>
  )
}

export default ProductList