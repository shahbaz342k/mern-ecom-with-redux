import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import Loader from './../loader/Loader';

const HeaderUserMenu = () => {
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = (e) => {
        e.preventDefault();
        // console.log('logiut click')
        dispatch(logout());
        setTimeout( () => {
            navigate('/user/login');
        }, 1000)
    }
  return (
    <>
    {/* {loading &&  <Loader />} */}
  
    <div className="dropdown">
        <span className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        My Account
        </span>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li className='mx-3'>{user.name}</li>
        <li><Link to='/user/my-account' className='dropdown-item'>My Account</Link></li>
        <li><span className='mx-3 logout' style={{cursor:'pointer'}} onClick={(e) => handleLogout(e) }>Logout</span></li>
        </ul>
    </div>
    </>
  )
}

export default HeaderUserMenu