import React from 'react'
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const {username} = location.state;
  return (
    <div>{username}</div>
  )
}

export default UserProfile