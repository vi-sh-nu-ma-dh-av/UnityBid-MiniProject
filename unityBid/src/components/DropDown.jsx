import React, { useState, useEffect } from 'react';
import "./DropDown.css"
import UserLogo from "./Navbar/user.jpg"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { request } from '../axios_helper';

function DropDown() {
  const [user, setUser] = useState('default');
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();

  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/Login")
    window.history.replaceState(null, null, '/Login');
  }

  const deleteAccount = async () => {
    const response = await request('delete', '/user/deleteaccount')
    alert(response.data)
    handleLogout();
  }

  useEffect(() => {
    const fetchUser = async () => {
      const response = await request('post', '/user/getUser');
      setUser(response.data);
    };

    fetchUser();
  }, []);

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className='user-button'>
        <img src={UserLogo} alt="userbutton" />
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {/* Your dropdown items go here */}
          <p>{user.name}</p>
          <div className="user-popup-buttons">
            <button className='user-popup-button' onClick={handleLogout}>Log Out</button>
            <button className='user-popup-button' onClick={deleteAccount}>Delete Account</button>
          </div>
        </div>
      )}
    </div>
    
    
  );
}

export default DropDown;
