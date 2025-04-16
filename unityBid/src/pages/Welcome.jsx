import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import NavFromWelcome from '../components/NavFromWelcome';

const Welcome = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route exact path="/" element={<NavFromWelcome />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
            </Routes>
        </Router>
    </div>
  )
}

export default Welcome