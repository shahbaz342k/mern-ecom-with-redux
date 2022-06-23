import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartQuantity } from './../../redux/actions/cartActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import Loader from '../loader/Loader';
import swal from 'sweetalert';
const CartItemsRow = (props) => {
    const dispatch = useDispatch();
    const result = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const [loadershow, setLoadershow] = useState(false);
    const {item} = props;

    const getIds = () => {
        if( result.cart.items ){
          let ids = Object.keys(result.cart.items);
          ids = ids.toString();
          return {ids};
        }
      }
      
      const qtyIncrement = (item, _id, updtype) => {
        // e.preventDefault()
        // console.log('increment id ', _id)
        setLoading(true)
        setLoadershow(true)
        dispatch(updateCartQuantity(item, _id, updtype));
        // fetchCart(url,getIds);
        setLoading(false)
        setTimeout(() => {
          setLoadershow(false)
        }, 2000);
    
      }
    
      // quantity decrement code 
      const qtyDecrement = (item,_id,updtype) => {
          // console.log('decrement id ', _id)
          if( _id > 1 ){
            setLoadershow(true)
            setLoading(true)
            dispatch(updateCartQuantity(item,_id,updtype))
            // fetchCart(url,getIds);
            setLoading(false)
            setTimeout(() => {
              setLoadershow(false)
            }, 2000);
            
          }
      }

      // remove item code 
      const removeItem = (item) => {
        // swal('hello w', 'cancel')

        swal({
          title: "Are you sure want do delete?",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            dispatch(removeFromCart(item))
            swal("Product deleted!", {
              icon: "success",
            });
          }
        });
        // if( window.confirm('Are you sure want to delete') ){
        //   dispatch(removeFromCart(item))
        // }
        
      }

      // get quantity code
      const getQty = (_id) => {
        if( result.cart.items ){
          // console.log('get qty ', result)
          return result.cart.items[_id];
        }
      }

      // get subtotal code 
      const getSubTotal = (_id, price) => {
        if( result.cart.items ){
          return result.cart.items[_id] * price;
        }else{
          return price;
        }
      }

      // onchange event fuciton
      const handleChangeQty = (e) => {
        // console.log(e.target.value)
      }
  return (
    <>
    {
      loadershow ? <Loader />: ''
    }
    
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col-2"><img className="img-fluid" src={item.image} alt={item.title} /></div>
        <div className="col">
            <div className="row text-muted">{item.title}</div>
            <div className="row">Cotton T-shirt</div>
        </div>
        <div className="col cartQty">
          <button className='btn btn-primary' onClick={() => qtyDecrement(item, result.cart.items[item._id], 'dec')}>-</button>
          <input type="text" className='qty' id='qty' value={ getQty(item._id) } onChange={(e) => handleChangeQty(e)}/>
          {/* <button className='btn btn-primary' onClick={(e) => qtyIncrement(e, item._id)}>+</button> */}
          <button className='btn btn-primary' onClick={() => qtyIncrement(item,result.cart.items[item._id],'inc')}>+</button>
        </div>
        <div className="col cartSubRemove">
          $ { getSubTotal(item._id,item.price) } 
          {/* <span className="close"><button className='btnRemove' onClick={()=> removeItem(item) }>X</button></span> */}
          <FontAwesomeIcon icon={faCircleXmark} className='iconRemove' onClick={(e) => removeItem(item)} />
        </div>
      </div>
    </div>
    </>
  )
}

export default CartItemsRow