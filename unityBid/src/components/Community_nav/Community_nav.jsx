import React from 'react'
import "./Community_nav.css"
import DropDown from "../DropDown"
import { useState } from 'react'
import Modal from 'react-modal'
import { request } from '../../axios_helper'
import { useNavigate } from 'react-router-dom'

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
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

const Community_nav = ({ cid, cname, username }) => {

  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(true);
  const [isMember, setIsMember] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addMemeberOpen, setAddMemberOpen] = useState(false);
  const [removeMemeberOpen, setRemoveMemberOpen] = useState(false);
  const [removeCommunityOpen, setRemoveCommunityOpen] = useState(false);
  const [leaveCommunityOpen, setLeaveCommunityOpen] = useState(false);

  const [addMemberUserId, setAddMemberUserId] = useState()
  const [removeMemberUserId, setRemoveMemberUserId] = useState()

  const communityId = cid;
  let subtitle;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function openAddMemberModal() {
    setAddMemberOpen(true);
  }

  function afterOpenAddMemberModal() {
    subtitle.style.color = '#f00';
  }

  function closeAddMemberModal() {
    setAddMemberOpen(false);
  }

  function openRemoveMemberModal() {
    setRemoveMemberOpen(true);
  }

  function afterOpenRemoveMemberModal() {
    subtitle.style.color = '#f00';
  }

  function closeRemoveMemberModal() {
    setRemoveMemberOpen(false);
  }

  function openRemoveCommunityModal() {
    setRemoveCommunityOpen(true);
  }

  function afterOpenRemoveCommunityModal() {
    subtitle.style.color = '#f00';
  }

  function closeRemoveCommunityModal() {
    setLeaveCommunityOpen(false);
  }

  function openLeaveCommunityModal() {
    setLeaveCommunityOpen(true);
  }

  function afterOpenLeaveCommunityModal() {
    subtitle.style.color = '#f00';
  }

  function closeLeaveCommunityModal() {
    setLeaveCommunityOpen(false);
  }

  const handleRemoveCommunitySubmit = async event => {
    event.preventDefault();
    try {
      // Add logic to remove the community
      const response = await request('delete', '/user/admin/removecommunity', {
        cid: cid
      });
      alert(response.data);
      
      // Navigate to home page after removing the community
      navigate("/Home");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  
  const handleLeaveCommunitySubmit = async event => {
    event.preventDefault();
    try {
      console.log("hello");
      // Add logic to leave the community
      const response = await request('delete', '/user/leavecommunity', {
        cid: cid
      });
      console.log("success");
      alert(response.data);
      // Navigate to home page after leaving the community
      navigate("/Home");
    } catch (error) {
      alert(error);
      console.log("failure");
      console.error(error);
    }
  }
  
  const handleAddMemberSubmit = async event => {
    event.preventDefault();
    try {
      // Add logic to add a member to the community
      const userId = parseInt(addMemberUserId, 10);
      if (!isNaN(userId)) {
        // Add logic to add a member to the community
        const response = await request('post', '/user/admin/addmember', {
          uid: userId,
          cid: cid
        });
        alert(response.data);
        setAddMemberOpen(false)
        // No navigation needed, staying on the community page
      } else {
        alert('Please enter a valid user ID');
      }
      // No navigation needed, staying on the community page
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  
  const handleRemoveMemberSubmit = async event => {
    event.preventDefault();
    try {
      // Add logic to add a member to the community
      const userId = parseInt(removeMemberUserId, 10);
      if (!isNaN(userId)) {
        // Add logic to add a member to the community
        const response = await request('delete', '/user/admin/removemember', {
          uid: userId,
          cid: cid
        });
        alert(response.data);
        setRemoveMemberOpen(false)
        // No navigation needed, staying on the community page
      } else {
        alert('Please enter a valid user ID');
      }
      // No navigation needed, staying on the community page
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  
  useState(() => {
    const fetchAdmin = async event => {
      try{
        const response = await request('post', '/user/isadmin', {
          cid: cid
        } )
  
        alert(response.data)
        setIsAdmin(response.data)
      }catch(error){
        alert(error)
        console.log(error)
      }
    }

    const fetchIsMember = async event => {
      try{
        const response = await request('post', '/user/ismember', {
          cid: cid
        } )
  
        //alert(response.data)
        setIsMember(response.data)
      }catch(error){
        alert(error)
        console.log(error)
      }
    }

    fetchIsMember();
    //fetchAdmin();
  }, [])

  

  return (

    <div className='nav-wrapper'>
        <div className="nav-content">
            <h5>{ cname }</h5>
            <div className="community-nav-buttons">
              
                <div className="community-feature-dropdown">
                  <button onClick={toggleDropdown} className='community-nav-features'>Features</button>
                  {isDropdownOpen && isMember && (
                    <div className="community-feature-dropdown-content">
                      <div className='community-feature-dropdown-item' onClick={openLeaveCommunityModal}> Leave Community</div>
                          <Modal
                            isOpen={leaveCommunityOpen}
                            onAfterOpen={afterOpenLeaveCommunityModal}
                            onRequestClose={closeLeaveCommunityModal}
                            style={customStyles}
                            contentLabel="Leave Community Modal"
                            className= "modal-content"
                          >
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='community-feature-modal-head'>Leave Community</h2>
                            <button className='buttons' id='close-btn' onClick={closeLeaveCommunityModal}>X</button>
                            <div className='community-feature-modal-inside'>
                              <form className='community-features-form' onClick={handleLeaveCommunitySubmit}>{/**  */}
                                <h5>Confirm to Leave Community</h5>
                                <div className="form-element">
                                  <input className='form-button' type="submit" value="Confirm" onClick={handleLeaveCommunitySubmit}/>
                                  <button className='form-button' id='cancel-button' value="Cancel" onClick={closeLeaveCommunityModal} >Cancel </button>
                                </div>
    
                              </form>
                            </div>
                            
                          </Modal>
                      {isAdmin && (
                        <div className="admin-dropdown-content">
                          <div className='community-feature-dropdown-item' onClick={openAddMemberModal}>Add Member</div>
                          <Modal
                            isOpen={addMemeberOpen}
                            onAfterOpen={afterOpenAddMemberModal}
                            onRequestClose={closeAddMemberModal}
                            style={customStyles}
                            contentLabel="Add Member Modal"
                            className= "modal-content"
                          >
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='community-feature-modal-head'>Add Member</h2>
                            <button className='buttons' id='close-btn' onClick={closeAddMemberModal}>X</button>
                            <div className='community-feature-modal-inside'>
                            <form className='community-features-form' onSubmit={handleAddMemberSubmit}>
                              <div className="form-element">
                                <input type="text" className='form-in' value={addMemberUserId} onChange={e => setAddMemberUserId(e.target.value)} placeholder='member userId' />
                              </div>
                              <div className="form-element">
                                <input className='form-button' type="submit" value="Confirm" />
                                <button className='form-button' id='cancel-button' type="button" onClick={closeAddMemberModal}>Cancel</button>
                              </div>
                            </form>

                              
                            </div>
    
                          </Modal>
                          <div className='community-feature-dropdown-item' onClick={openRemoveMemberModal}> Remove Member</div>
                          <Modal
                            isOpen={removeMemeberOpen}
                            onAfterOpen={afterOpenRemoveMemberModal}
                            onRequestClose={closeRemoveMemberModal}
                            style={customStyles}
                            contentLabel="Remove Member Modal"
                            className= "modal-content"
                          >
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='community-feature-modal-head'>Remove Member</h2>
                            <button className='buttons' id='close-btn' onClick={closeRemoveMemberModal}>X</button>
                            <div className='community-feature-modal-inside'>
                              <form className='community-features-form' onSubmit={handleRemoveMemberSubmit}>
                                <div className="form-element">
                                  <input type="text" className='form-in' value={removeMemberUserId} onChange={e => setRemoveMemberUserId(e.target.value)} placeholder='member userId' />
                                </div>
                                <div className="form-element">
                                  <input className='form-button' type="submit" value="Confirm" />
                                  <button className='form-button' id='cancel-button' type="button" onClick={closeRemoveMemberModal}>Cancel</button>
                                </div>
                              </form>
                            </div>
                            
                          </Modal>
                          <div className='community-feature-dropdown-item' onClick={openRemoveCommunityModal}> Remove Community</div>
                          <Modal
                            isOpen={removeCommunityOpen}
                            onAfterOpen={afterOpenRemoveCommunityModal}
                            onRequestClose={closeRemoveCommunityModal}
                            style={customStyles}
                            contentLabel="Remove Community Modal"
                            className= "modal-content"
                          >
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='community-feature-modal-head'>Remove Community</h2>
                            <button className='buttons' id='close-btn' onClick={closeRemoveCommunityModal}>X</button>
                            <div className='community-feature-modal-inside'>
                              <form className='community-features-form' onClick={handleRemoveCommunitySubmit}>{/**  */}
                                <h5>Confirm to Remove Community</h5>
                                <div className="form-element">
                                  <input className='form-button' type="submit" value="Confirm" />
                                  <button className='form-button' id='cancel-button' value="Cancel" onClick={closeRemoveCommunityModal} >Cancel </button>
                                </div>
    
                              </form>
                            </div>
                            
                          </Modal>
                        </div>
                        
                      )}
                      
                    </div>
                  )}
                </div>

              <DropDown />
            </div>
            
            
            

        </div>
    </div>
  )
}

export default Community_nav