import React, { useState } from "react";
import "./AuctionCard.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { request } from "../axios_helper";

export const AuctionCard = ({auctionId, product, communityId, user }) => {
    //console.log(`auction: ${auctionId, product, communityId[0].product}`)
    const navigate = useNavigate();
    const [isMember, setIsMember] = useState(false)
    const [status, setStatus] = useState('')
    const [flag, setFlag] = useState()

    const fetchIsMember = async () => {
      try {
          const response = await request('post', '/user/ismember', {
              cid: communityId
          });
          setIsMember(response.data);
      } catch (error) {
          alert(error);
          console.log(error);
      }
  }
  
  const handleClick = async () => {
    try {
      const response = await request('post', '/user/ismember', {
          cid: communityId
      });
      const url = `/user/community/auction/bid/getstatus?aid=${auctionId}`
      const statusresponse = await request('get', url);
      console.log(url);
      setIsMember(response.data);
      setStatus(statusresponse);
      if (response.data === true  ) {
        if(statusresponse.data == 'STARTED'){
          console.log("hello")
          navigate("/BiddingPage", { state: { auctionId, product, communityId, user } });
        }
        else{
          alert("Auction not started")
        }
        
      } else {
          alert("You are not a member of the community");
      }
  } catch (error) {
      alert("An error occurred while checking membership status");
      console.log(error);
  }
  }
  


    return(
        <div className="auction-card" onClick={handleClick}>
            {/* <img src={details.logo} alt="logo" /> */}
            <h3>{product}</h3>
            {/* <h5>{communityId}</h5>
            {console.log(details)}
            {console.log("hello")} */}
        </div>
    )

}