import {useDispatch} from 'react-redux';
// import { addToCart } from '../../redux/test/action';
import { addToCart } from './../../redux/actions/cartActions';

const AddToCart = (props) => {
    const dispatch = useDispatch()
    const {product} = props;
    return (
        <div className='addToCart'>
            <button onClick={() => dispatch(addToCart(product))} className="btn btn-primary">Add to cart</button>
        {/* <button onClick={() => dispatch(removeToCart(product.id))}>Remove to cart</button> */}
        </div>
    )
}

export default AddToCart