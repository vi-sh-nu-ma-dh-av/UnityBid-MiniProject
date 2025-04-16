import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import "./Community.css";
import { useLocation, useNavigate } from 'react-router-dom';
import Community_nav from '../components/Community_nav/Community_nav';
import { request } from '../axios_helper';
import { AuctionCard } from '../components/AuctionCard';
import CommunityImage from "../components/communityLogo.jpeg"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '40%',
    overflow: 'auto',
    transition: 'all 0.3s ease-in-out',
    position: 'relative'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transition: 'all 0.3s ease-in-out'
  }
};

Modal.setAppElement('#root'); // Assuming 'root' is your appElement

const Community = () => {
  const location = useLocation();
  const { cname, cid } = location.state || {};
  const navigate = useNavigate();
  const [user, setUser] = useState('default');
  const [auctions, setAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [communitydetails, setCommunitydetails] = useState()

  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await request('post', '/user/getUser');
        setUser(userResponse.data);

        setIsLoading(true);
        const url = `/user/displayauctions?communityId=${cid}`
        const auctionResponse = await request('get', url);
        setAuctions(auctionResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCommunities = async () => {
      try{
        const url = `/user/communitydetails?cid=${cid}`
        const communityResponse = await request('get', url)
        setCommunitydetails(communityResponse.data);
        console.log(communityResponse.data)
      }
      catch(error){
        console.log(error)
      }
    }

    fetchData();
    fetchCommunities();
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const afterOpenModal = () => {};
  const closeModal = () => setIsOpen(false);

  return (
    <div className='community-page-container'>
      <Community_nav cid={cid} cname={cname} username={user.name} />
      <div className="community-page-content">
          
        <div className="community-details">
          <img src={CommunityImage} alt='community image' className='community-logo'/>
          <button className='buttons' onClick={openModal}>Details</button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className= "modal-content"
          >
            <h2 className='modal-head'>{cname}</h2>
            <button className='buttons' id='close-btn' onClick={closeModal}>X</button>
            <div className='modal-inside'>
              
            {communitydetails && Object.keys(communitydetails).length > 0 && (
              <dl>
                  <p>{communitydetails.description}</p>
                  <dt>To Join: </dt>
                  <dd>Contact {communitydetails.mobile}</dd>
              </dl>
          )}

            </div>
          </Modal>
        </div>

        <div className="community-auctions">
          
          <div className="community-auctions-content">
            <div className='auctions-grid'>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                auctions.map((auction, index) => (
                  <div className="auctions-grid-items" key={index}>
                    <AuctionCard
                      key={auction.auctionId}
                      auctionId={auction.auctionId}
                      product={auction.product}
                      communityId={auction.communityId}
                      user={user}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
