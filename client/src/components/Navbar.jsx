// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import HeaderCartIcon from './cart/HeaderCartIcon'
import { useSelector } from 'react-redux';
import HeaderUserMenu from './user/HeaderUserMenu'
import { useEffect } from 'react';

const Navbar = () => {
    const {user} = useSelector((state) => state.user);
    useEffect( () => {
        // console.log('useeffect','chnage', user)
    },[user])

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to='/' className="nav-link active">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/cart' className="nav-link">Cart</Link>
                    </li>
                </ul>
                <div className="d-flex justify-content-center align-items-center">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-4">

                           { !user ? <Link to='/user/login' className='nav-link'>Login</Link>
                            : <HeaderUserMenu />}
                        </li>
                       
                    </ul>
                    <HeaderCartIcon />
                </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar