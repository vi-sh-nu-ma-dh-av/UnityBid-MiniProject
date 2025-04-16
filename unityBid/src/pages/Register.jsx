import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./RegisterC.css"
import { request } from '../axios_helper';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    if (username && password) {
      try {
        // Send a post request to the /register endpoint
        console.log(mobile)
        await request('post', '/auth/signup', {
          
          name: name,
          email: username,
          password: password,
          mobile: mobile
        });
        // If the request is successful, navigate to the login page
        navigate('/Login');
      } catch (error) {
        // If the request fails, show an alert
        //alert('Username already exists');
        alert(error)
        console.log(error)
      }
    } else {
      alert('Please fill out all fields');
    }
  };


  return (
    <div className="reg-container">
      <div className='reg-content'>
        <h4 className="reg-head">Register</h4>
        <form className='reg-form' onSubmit={handleSubmit}>
          <div className="form-element">
              {/* <label>
                Username:  
              </label> */}
            <input className='reg-form-in' type="text" value={name} onChange={e => setName(e.target.value)} required placeholder='name'/>
          </div>
          <div className="form-element">
            {/* <label>
              Username:  
            </label> */}
            <input className='reg-form-in' type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder='username@email'/>
            
          </div>
          <div className="form-element">
            {/* <label>
              Password:
            </label> */}
            <input className='reg-form-in' type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder='password'/>
            
          </div>
          <div className="form-element">
            <input type="text" className="reg-form-in" value={mobile} onChange={e => setMobile(e.target.value)} required placeholder='mobile' />
          </div>
          <div className="form-element">
            <input className='form-button' type="submit" value="Register" />
          </div>

          <p>Already have an account, <Link to="/Login" className='link'>Login?</Link> </p>
        </form>
      
    
    
      </div>
    </div>
    
    
  );
}

export default Register;
