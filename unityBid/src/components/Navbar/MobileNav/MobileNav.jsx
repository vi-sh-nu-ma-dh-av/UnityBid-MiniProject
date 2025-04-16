import React, { useState, useRef, useEffect } from 'react';
import "./MobileNav.css";
import { Link as ScrollLink } from 'react-scroll';
import DropDown from '../../DropDown';
import Features from '../../Features';

const MobileNav = ({ isOpen, toggleMenu, username }) => {
  const menuRef = useRef(null);

  // Close the menu if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, toggleMenu, isOpen]);

  return (
    <>
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        <div ref={menuRef} className='mobile-menu-container'>
          <ul>
            <li>
                <DropDown />
            </li>
            <li>
              <ScrollLink className='menu-item' to='home-home' smooth={true}>Home</ScrollLink>
            </li>
            <li>
              <ScrollLink className='menu-item' to='home-communities' smooth={true}>Communities</ScrollLink>
            </li>
            <li>
              <ScrollLink className='menu-item' to='home-auctions' smooth={true}>Auctions</ScrollLink>
            </li>
            <li>
              <Features />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
