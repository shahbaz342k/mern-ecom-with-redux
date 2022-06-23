import React, {useState} from 'react'
import './css/login.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
const baseApiUrl = process.env.REACT_APP_API_URL
const LoginComponent = () => {
    const LOGINAPIURL = `${baseApiUrl}/users/login`;
    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState([]);
    const [rememberMe, setRememberMe] = useState(false);
    // console.log('url :',LOGINAPIURL);
    
    const userRes = useSelector((state) => state.user);
    
    const {user,loading,error} = useSelector((state) => state.user);
    console.log(userRes);

    const dispatch = useDispatch();
    const [credendials, setCredendials] = useState({
        email:null,
        password:null
    });
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        // console.log('onchage handler');
        setCredendials( (prev) => ({...prev, [e.target.id]:e.target.value}) )
    } 

    // login function code
    const login = async () => {
         
         try{
            // setLoading(true)
            const res = await axios.post(LOGINAPIURL,credendials);
            // console.log(res);
            // setData(res.data.result)
            dispatch( loginSuccess(res.data.result) )
            // setLoading(false)
            
            navigate('/user/my-account');
        }catch(err){
            // console.log(err);
            dispatch( loginFailure(err.response.data.message) )
            // setErrors(err.response.data.message)
        }
    }
   
    const loginSubmit = async (e) => {
        e.preventDefault()
        setErrors(false)
        // console.log('login sumbmit')
        console.log(credendials);
        // console.log('remember me',rememberMe)
        
        if( !credendials.email ){
            setErrors('email cannot be empty')
        }else if( !credendials.password ){
            setErrors('password cannot be empty')
        }else{
            dispatch(loginStart());
            // here login api function call
            if( rememberMe ){
                window.localStorage.setItem('rememberMeInfo', JSON.stringify({email:credendials.email, password:credendials.password}))
            }else{
                window.localStorage.removeItem('rememberMeInfo')
            }
            login();
               
        }
        
        
    }
    useEffect( () => {
        setErrors(false)
        const rememberMeInfo = JSON.parse(window.localStorage.getItem('rememberMeInfo'));
        if(rememberMeInfo){
            credendials.email = rememberMeInfo.email;
            credendials.password = rememberMeInfo.password;
            setRememberMe(true);
        }
        
    },[])

    


  return (
    <>
    
    <main className="form-signin">
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" onChange={ (e) =>  onChangeHandler(e) } placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
            <input type="password" className="form-control" id="password" onChange={ (e) =>  onChangeHandler(e) } placeholder="Password" />
            <label htmlFor="password">Password</label>
        </div>
        { errors ? <span className='err'>* {errors}</span> : '' }
        { error && <span className='err'>* {error}</span> } 
        
        <div className="checkbox mb-3 df-ai-g">
            <input type="checkbox" name='rememberme' id='rememberme' checked={ rememberMe ? 'checked' : '' } onClick={ () => setRememberMe(!rememberMe) }  /> 
            <label htmlFor='rememberme'>Remember me</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" onClick={ (e) => loginSubmit(e) } type="submit">Sign in</button>
        <div className='accountInfo pt-3'>
            <p>Don't have account? <Link to='/user/signup'>Signup here!</Link></p>
        </div>
    </main>

    </>
  )
}

export default LoginComponent