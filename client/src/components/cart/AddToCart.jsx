import { useState } from 'react';
import {useDispatch} from 'react-redux';
// import { addToCart } from '../../redux/test/action';
import { addToCart } from './../../redux/actions/cartActions';

const AddToCart = (props) => {

    const dispatch = useDispatch();
    const [someAdding, setSomeAdding] = useState(false);
    const handleAddToCart = (product) => {
        console.log('adding click')
        setSomeAdding(true)
        dispatch(addToCart(product))
        setTimeout(() => {
            setSomeAdding(false);
        }, 1000);
        
    }
    const {product} = props;
    return (
        <div className='addToCart'>
            <button onClick={() => handleAddToCart(product)} disabled={someAdding ? 'disabled' : ''} className="btn btn-primary">{someAdding ? 'Adding' : 'Add to cart'}</button>
        {/* <button onClick={() => dispatch(removeToCart(product.id))}>Remove to cart</button> */}
        </div>
    )
}

export default AddToCart