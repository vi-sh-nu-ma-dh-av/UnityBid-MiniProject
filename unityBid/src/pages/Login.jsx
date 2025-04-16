import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginC.css"
import { Link } from 'react-router-dom';
import { request, setAuthHeader } from '../axios_helper';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      // Send a post request to the /authenticate endpoint
      const response = await request('post', '/auth/login', {
        email: username,
        password: password,
      });
      // If the request is successful, store the token in local storage
      setAuthHeader(response.data.token);
      // Navigate to the home page
      navigate("/Home", {state:{username}});
    } catch (error) {
      // If the request fails, show an alert
      alert('Invalid username or password');
      console.log(error)
    }
  };


  return (
    <div className="log-container">
      <div className="log-content">
        <form className='log-form' onSubmit={handleSubmit}>
          <h4 className='log-head'>Login</h4>
          <div className="form-element">
            {/* <label>Username:</label> */}
            <input className='form-in' type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder='username@your-email'/>
          </div>

          <div className="form-element">
            {/* <label>Password:</label> */}
            <input className='form-in' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password'/>
          </div>
          
          <div className="form-element">
            <input className='form-button' type="submit" value="Log in" />
          </div>
          
          <p>Are you a new user, <Link to="/Register" className='link'>Register?</Link> </p>
            
          
          
        </form>
      </div>
      
    </div>
    
  );
}

export default Login;
