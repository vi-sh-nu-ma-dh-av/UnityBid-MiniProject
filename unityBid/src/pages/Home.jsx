import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { request } from "../axios_helper"
import Navbar from "../components/Navbar/Navbar"
import Logo from "../assets/UnityBid-logos_white.png"
import "./Home.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CommunityCard from '../components/CommunityCard';
import { AuctionCard } from '../components/AuctionCard';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [communities, setCommunities] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [user, setUser] = useState('default');
  //const location = useLocation();
  //const user = location.state ? location.state.user : 'default';

  const deviceType = window.innerWidth > 1024 ? "desktop" : window.innerWidth > 464 ? "tablet" : "mobile";

  useEffect(() => {

    const fetchUser = async () => {
      const response = await request('post', '/user/getUser');
      setUser(response.data);
      
    };

    const fetchCommunities = async () => {
      const response = await request('get', '/user/listallcommunity');//replace /communities with the actual endpoints
      setCommunities(response.data);
      //console.log(`communities: ${communities[0].cid}`)
    };


    const fetchAuctions = async () => {
      const response = await request('get', '/user/community/auction/listallauction');//replace /auctions with the actual endpoints
      setAuctions(response.data);
      console.log(`auctions: ${auctions}`)
    };

    fetchUser();
    fetchCommunities();
    fetchAuctions();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  

  return (
    <div className='home-container'>
      <div className="home-nav">
        {console.log(user.name)}
        <Navbar  user={user}/>
      </div>
      
      <div className="home-home">
          <div className="home-homeName">
              <div className="home-logoContainer">
                <img src={Logo} alt="Logo" />
              </div>
          </div>
          <div className="home-homeContent">
              
          </div>
      </div >
        
      <div className="home-communities">
        <h3>Communities</h3>
        <div className="home-community-content">
          <Carousel 
            responsive={responsive}
            showDots = {true}
            ssr = {true}
            infinite = {true}
            keyBoardControl = {true}
            
          >
            {communities.map((community, index) => (
              <CommunityCard key={index} cname={community.cname} cid = {community.cid} />
              
            ))}
          </Carousel>

        </div>
      </div>
        
      <div className="home-auctions">
        <h3>Auctions</h3>

        <div className="home-auction-content">
          <Carousel 
            responsive={responsive}
            showDots = {true}
            ssr = {true}
            infinite = {true}
            keyBoardControl = {true}
        
          >
            {auctions.map((auction, index) => (
              <AuctionCard key={index} auctionId = {auction.auctionId} product={auction.product} communityId = {auction.communityId} user={user} />
            ))}
          </Carousel>
        </div>
        
      </div>
    </div>
  )
}

export default Home