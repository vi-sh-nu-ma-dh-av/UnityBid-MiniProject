import React from 'react'
import { Link } from "react-router-dom";
import "./NavFromWelcome.css"
import Logo from "../assets/logoSmall.png"


const NavFromWelcome = () => {
  return (
    <div className='container'>
      <div className="logo-title">
        <div className="left">
          <div className="logo">
            <img className='logo-image' src={Logo} alt="Logo" />
          </div>
          
        </div>
        <div className="right">
          <h5 className='name'>Unity Bid</h5>
          <p className='quote'>Where Community Comes to Bid</p>
        </div>
      </div>
      
      <div className='button-container'>
          <Link to="/Login"><button className='home-buttons'>Login</button></Link>
          <Link to="/Register"><button className='home-buttons'>Register</button></Link>
        </div>
    </div>
  )
}

export default NavFromWelcome