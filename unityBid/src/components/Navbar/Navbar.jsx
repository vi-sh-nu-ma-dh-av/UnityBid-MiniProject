import React, { useState } from 'react'
import "./Navbar.css"
import MobileNav from './MobileNav/MobileNav'
import { FiMenu } from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';
import userLogo from "./user.jpg"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DropDown from '../DropDown';
import Search from '../Search';
import Features from '../Features';



 
const Navbar = ({user}) => {
    //console.log(user.uid)
    const [openMenu, setOpenMenu] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();


    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const [auctionImage, setAuctionImage] = useState(null);

  function handleImageUpload(e) {
    console.log(e.target.files);
    setAuctionImage(e.target.files[0]);
  }

    
    
    // function handleUserButtonClick() {
    //     navigate("/UserProfile", { state: { username } });
    //   }
      
      

  return (
   <>

        <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />
        


        <nav className='nav-wrapper'>
            <div className='nav-content'>
                
                <Search />

                <ul>
                    <li>
                        <ScrollLink className='menu-items' to='home-home' smooth={true}>Home</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink className='menu-items' to='home-communities' smooth={true}>Communities</ScrollLink>
                    </li>
                    <li>
                        <ScrollLink className='menu-items' to='home-auctions' smooth={true}>Auctions</ScrollLink>
                    </li>
                    <li>
                        <Features user={user.uid}/>
                    </li>
                    
                    <li>
                        <DropDown />
                    </li>

                    
                </ul>

                 <button className="menu-btn" onClick={toggleMenu}>
                    <FiMenu />
                    
                 </button>
            </div>
        </nav>
   </>
  )
}

export default Navbar