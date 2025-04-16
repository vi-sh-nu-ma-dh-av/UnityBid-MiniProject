import React from 'react'
import "./CommunityCard.css"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'



const CommunityCard = ({cname, cid}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Community", {state: {cname, cid }})
  }


  return (
    <button className='community-card' onClick={handleClick}>
        {/* <img src={details.logo} alt="logo" /> */}
        <h4>{cname}</h4>
    </button>
  )
}

export default CommunityCard
