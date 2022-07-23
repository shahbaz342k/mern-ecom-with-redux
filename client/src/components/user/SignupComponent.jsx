import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { emailValidation } from '../Helper/emailValidation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registrationSuccess } from '../../redux/actions/userActions';
const baseApiUrl = process.env.REACT_APP_API_URL

const SignupComponent = () => {

    const [errors, setErrors] = useState({
        nameErr:null,
        emailErr:null,
        passwordErr:null,
    });
    const [userFormData, setUserFormData] = useState({
        name:null,
        email:null,
        password:null
    });

    const REGISTERAPIURL = `${baseApiUrl}/users/register`;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const onChangeHandler = (e) => {
        e.preventDefault();
        setUserFormData( (prev) => ({...prev, [e.target.id]:e.target.value}))
    }
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const onFileChange = (e) => {
        console.log('file change')
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        // console.log(e.target.files[0])
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // register api function
    const register = async () => {
        let formData = new FormData()
        try {
            if( file ){
                formData.append("file", file);
                formData.append("image", fileName);
            }else{
                // console.log('no image:',img);
                // dataSend = {name:crdentials.name, email:crdentials.email,password:crdentials.password}
            }

            formData.append("name", userFormData.name)
            formData.append("email", userFormData.email)
            formData.append("password", userFormData.password)
            const res = await axios.post(REGISTERAPIURL, formData);
            // console.log(res.data.result)
            dispatch(registrationSuccess(res.data.result))
            // window.localStorage.setItem('user', JSON.stringify(res.data.result))
            navigate('/user/my-account')
        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    //
    const registerSubmit = () =>{
        // console.log(userFormData)
        // call register function
        if( !userFormData.name ){
            setError( {nameErr: 'Please enter name'} )
        }else if( !userFormData.email ){
            setError( {emailErr:'Please enter email'} )
        }else if( !userFormData.password ){
            setError({passwordErr:'Please enter password'} )
        }else {
            if( userFormData.email && emailValidation(userFormData.email) ){
                setError({emailErr:'Email is not valid'}) 
                return;
            }else{
                setError(false)
                register(); 
            }
        }
        
    }
  return (
    <>
    <main className="form-signin">
        <h1 className="h3 mb-3 fw-normal">Please Signup</h1>
        <div className="form-floating mb-3">
            <input type="name" className="form-control" id="name" onChange={ (e) =>  onChangeHandler(e) } placeholder="John Doe" />
            <label htmlFor="floatingInput">Name</label>
        </div>
        { error.nameErr ? <span className='err'>* {error.nameErr}</span> : '' }
        <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" onChange={ (e) =>  onChangeHandler(e) } placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
        </div>
        { error.emailErr ? <span className='err'>* {error.emailErr}</span> : '' }
        <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" onChange={ (e) =>  onChangeHandler(e) } placeholder="Password" />
            <label htmlFor="password">Password</label>
        </div>
        { error.passwordErr ? <span className='err'>* {error.passwordErr}</span> : '' }
        
        <div className='form-control mb-3' style={{
              textAlign: 'center',
              padding: '2%',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}>
                <label htmlFor="file" style={{cursor:'pointer'}}>
                  <span style={{marginRight:'5px'}}>Select Image</span> 
                <FontAwesomeIcon icon={faCamera} />
                <input type="file" onChange={onFileChange} id='file' style={{display:'none'}}/>
                </label>
            </div>

        <button className="w-100 btn btn-lg btn-primary" onClick={ (e) => registerSubmit(e) } type="submit">Sign Up</button>
        <div className='accountInfo pt-3'>
            <p>Already have account? <Link to='/user/login'>Sign in here!</Link></p>
        </div>
    </main>
    </>
  )
}

export default SignupComponent