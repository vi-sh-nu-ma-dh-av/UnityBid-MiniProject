import React, { useState, useRef, useEffect } from 'react';
import "./MyCommunitiesList.css";
import { request } from '../axios_helper';
import { useNavigate } from 'react-router-dom';

const MyCommunitiesList = ( { user }) => {

    
  const [isMyCommunityOpen, setIsMyCommunityOpen] = useState(false)
  const [myCommunity, setMyCommunity] = useState([]);

  const toggleMyCommunityOpen = () => setIsMyCommunityOpen(!setIsMyCommunityOpen)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMyCommunity = async () => {
        const response = await request('get', '/user/listmycommunities');
        setMyCommunity(response.data);
      }

      fetchMyCommunity();
  }, [])
  const cname = "cse2025";
  const cid = 1;
  const handleMyCommunityClick = () => {
    navigate("/Community", {state: {cname, cid }})
  }

  const myCommunityMenuClass = `dropdown-menu${isMyCommunityOpen ? " show" : ""}`;

  return (
    <div className="dropdown" onClick={toggleMyCommunityOpen}>
        <div className='dropdown-item'>My Communities</div>
        <div className={myCommunityMenuClass}>
            {myCommunity.map((index, community) => {
                <a href="#" className="dropdown-item" onClick={handleMyCommunityClick}>{ community.cname }</a>
                {/**onClick={handleMyCommunityClick(community.cname, community.cid)} */}
            })}
        </div>
    </div>
  )
}

export default MyCommunitiesList