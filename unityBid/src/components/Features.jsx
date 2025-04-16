import React, { useState, useRef, useEffect } from 'react';
import './Features.css';
import Modal from 'react-modal';
import { request } from '../axios_helper';
import MyCommunitiesList from './MyCommunitiesList';
import CommunityCard from './CommunityCard';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import { useNavigate } from 'react-router-dom';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '40%',
      height: '70%',
      overflow: 'auto',
      transition: 'all 0.3s ease-in-out',
      position: 'relative'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black
      backdropFilter: 'blur(3px)', // Apply a blur effect
      transition: 'all 0.3s ease-in-out'
    }
  };
  
  Modal.setAppElement('#root');

  const Features = ({user}) => {

    const navigate = useNavigate()

    const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [communityModalIsOpen, setCommunityModalIsOpen] = useState(false);

  const [isAuctionOpen, setIsAuctionOpen] = useState(false);
  const [auctionModalIsOpen, setAuctionModalIsOpen] = useState(false);

  const [isMyCommunityOpen, setIsMyCommunityOpen] = useState(false);
  const [myCommunityModalIsOpen, setMyCommunityModalIsOpen] = useState(false);

  

  const subtitle = useRef(null);

  const [myCommunity, setMyCommunity] = useState([])

  const [createCommunityName, setCreateCommunityName] = useState('');
  const [createCommunityLocation, setCreateCommunityLocation] = useState('');
  const [createCommunityDescription, setCreateCommunityDescription] = useState('');

  const [createAuctionMyCommunity, setCreateAuctionMyCommunity] = useState([]);
  const [createAuctionProductName, setCreateAuctionProductName] = useState('');
  const [createAuctionStartPrice, setCreateAuctionStartPrice] = useState();
  const [createAuctionStartDate, setCreateAuctionStartDate] = useState(new Date());
  const [createAuctionStartTime, setCreateAuctionStartTime] = useState('');
  const [createAuctionDescription, setCreateAuctionDescription] = useState('');
  const [createAuctionSelectedCommunity, setCreateAuctionSelectedCommunity] = useState('');
  const [image, setImage] = useState('');
  const [communityImage, setCommunityImage] = useState();

  const toggleCommunityOpen = () => setIsCommunityOpen(!isCommunityOpen);
  

  const toggleAuctionOpen = () => setIsAuctionOpen(!isAuctionOpen);

  const openCommunityModal = (event) => {
    event.stopPropagation();
    setCommunityModalIsOpen(true);
  }

  const afterOpenCommunityModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.current.style.color = '#f00';
  }

  const closeCommunityModal = (event) => {
    event.stopPropagation();
    setCommunityModalIsOpen(false);
  }


  const openAuctionModal = (event) => {
    event.stopPropagation();
    setAuctionModalIsOpen(true);
  }

  const afterOpenAuctionModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.current.style.color = '#f00';
  }

  const closeAuctionModal = (event) => {
    event.stopPropagation();
    setAuctionModalIsOpen(false);
  }

  const openMyCommunityModal = (event) => {
    event.stopPropagation();
    setMyCommunityModalIsOpen(true);
  }

  const afterOpenMyCommunityModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.current.style.color = '#f00';
  }

  const closeMyCommunityModal = (event) => {
    event.stopPropagation();
    setMyCommunityModalIsOpen(false);
  }



  const handleCreateCommunitySubmit = async event => {
    event.preventDefault();
    try{
        const response = await request('post', 'user/createcommunity', {
            cname: createCommunityName,
            description: createCommunityDescription,
            location: createCommunityLocation
        });
        closeCommunityModal();
    }catch(error){
        console.log(error);
        //alert(error)
    }

  }

  const handleChangeCreateAuctionSelectedCommunity = (event) => {
    setCreateAuctionSelectedCommunity(event.target.value);
  }

  useEffect(() => {
    const fetchMyCommunity = async () => {
        const response = await request('get', '/user/listjoinedcommunities');
        setMyCommunity(response.data);
      }
  
      //fetchUser();
      fetchMyCommunity();
  }, [])

  
    // function handleImageUpload(e){
    //     console.log(e.target.files)

    //     setImage(e.target.files[0])
    // }

    const handleCreateAuctionSubmit = async event => {
      event.preventDefault(); // Prevent default form submission behavior
      
      try {
          // Format the starting date to 'yyyy-MM-dd'
          const formattedDate = new Date(createAuctionStartDate).toISOString().split('T')[0];
          
          // Format the starting time to 'hh:mm:ss'
          //const formattedTime = createAuctionStartTime.toISOString().split('T')[1].split('.')[0]
  
          await request('post', 'user/createauction', {
              communityname: createAuctionSelectedCommunity,
              productname: createAuctionProductName,
              description: createAuctionDescription,
              startingprice: createAuctionStartPrice,
              startingdate: formattedDate,
              startingtime: createAuctionStartTime,
              status: "NOT_STARTED"
          });
  
      } catch (error) {
          console.log(error);
          alert(error);
      }
  };
  
  

    function handleImageChange(){
        const formData = new FormData();
        formData.append('uploadImage', auctionImage)
        const endpoint = 'http://localhost:8080/uploadImage';
        const parm1 = 1;
        const url = `${endpoint}/${parm1}`
        axios.post(url,formData).then((res)=>{
            console.log(res)
        })
    }
    
    function gotoAuctionImage(){
        navigate("/ImageUpload")
    }

    const menuClass = `dropdown-menu${isAuctionOpen || isCommunityOpen ? " show" : ""}`;
  // const myCommunityMenuClass = `dropdown-menu${isMyCommunityOpen ? " show" : ""}`;

  return (
    <div className="dropdown" onClick={toggleCommunityOpen}>
      <button className="dropdown-toggle">
        Features
      </button>
      <div className={menuClass}>
        <a href="#" className="dropdown-item" onClick={openCommunityModal}>Create Community
        <Modal
          isOpen={communityModalIsOpen}
          onAfterOpen={afterOpenCommunityModal}
          onRequestClose={(event) => closeCommunityModal(event)}
          style={customStyles}
          contentLabel="Example Modal"
          className= "modal-content"
        >

            <div className='create-content'>
              <h4 className="create-head">Create Community</h4>
              <button className='buttons' id='close-btn' onClick={closeCommunityModal}>X</button>
              {/* <form className='create-form' onSubmit={handleCreateCommunitySubmit}> */}
              <form className='create-form' onSubmit={handleCreateCommunitySubmit}>
                <div className="form-element">
                  <input className='create-form-in' type="text" value={createCommunityName} onChange={e => setCreateCommunityName(e.target.value)} required placeholder='community name'/>
                </div>
                <div className="form-element">
                  <input className='create-form-in' type="text" value={createCommunityLocation} onChange={e => setCreateCommunityLocation(e.target.value)} required placeholder='location'/>
                </div>
                <div className="form-element">
                  <textarea className='create-form-in' value={createCommunityDescription} onChange={e => setCreateCommunityDescription(e.target.value)} required placeholder='description'/>
                </div>
                {/* <div className="form-element"> */}
                  {/* <input className='image-in' type="file"  onChange={handleImageUpload} required /> onChange={handleImageUpload} */}
                {/* </div> */}
                <div className="form-element">
                  <input className='form-button' type="submit" value="Create" />
                </div>
              </form>
              
            </div>
            
        </Modal>
        </a>
        <a href="#" className="dropdown-item" onClick={openAuctionModal}>Create Auction
        <Modal
          isOpen={auctionModalIsOpen}
          onAfterOpen={afterOpenAuctionModal}
          onRequestClose={(event) => closeAuctionModal(event)}
          style={customStyles}
          contentLabel="Example Modal"
          className= "modal-content"
        >
            <div className='create-content'>
              <h4 className="create-head">Create Auction</h4>
              <button className='buttons' id='close-btn' onClick={closeAuctionModal}>X</button>
              <form className='create-form' onSubmit={handleCreateAuctionSubmit}> {/**handleCreateAuctionSubmit(event, user, createAuctionSelectedCommunity, createAuctionProductName, createAuctionStartPrice, createAuctionStartDate)} */}
                <div className="form-element">
                  <input className='create-form-in' type="text" value={createAuctionProductName} onChange={e => setCreateAuctionProductName(e.target.value)} required placeholder='product name'/>
                </div>

                <div className="form-element">
                  <input className='create-form-in' type="numberr" value={createAuctionStartPrice} onChange={e => setCreateAuctionStartPrice(e.target.value)} required placeholder='starting price'/>
                </div>

                <div className="form-element">
                  <input className='create-form-in' type="text" value={createAuctionStartDate} onFocus={(e) => e.currentTarget.type = "date"} onBlur={(e) => e.currentTarget.type = "text"} onChange={e => setCreateAuctionStartDate(e.target.value)} placeholder='starting date'/>

                </div>

                <div className="form-element">
                  <input className='create-form-in' type="text" value={createAuctionStartTime}  onChange={e => setCreateAuctionStartTime(e.target.value)} placeholder='starting time HH:MM:SS'/>
                </div> 

                <div className="form-element">
                  <select 
                    id="selectionList" 
                    value={createAuctionSelectedCommunity} 
                    onChange={handleChangeCreateAuctionSelectedCommunity}
                  >
                    <option value="">--Please choose an option--</option> {/* Set value to empty string */}
                    {myCommunity.map((myCommunity, index) => (
                      <option key={index} value={myCommunity.cname}>{myCommunity.cname}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-element">
                  <textarea className='create-form-in' value={createAuctionDescription} onChange={e => setCreateAuctionDescription(e.target.value)} required placeholder='description'/>
                </div>
                {/* <div className="form-element"> */}
                  {/* <input className='image-in' type="file" onChange={handleImageUpload} required formEncType='multipart/form-data'/> */}
                {/* </div> */}
                {/* <button onClick={gotoAuctionImage}>click</button> */}

                <div className="form-element">
                  <input className='form-button' type="submit" value="Create" />
                </div>
              </form>
                      
              <p >
                if you haven't join any community, first join a community
              </p>
              

            </div>
        </Modal>
        </a>
        <a href="#" className="dropdown-item" onClick={openMyCommunityModal}>My Community
        <Modal
          isOpen={myCommunityModalIsOpen}
          onAfterOpen={afterOpenMyCommunityModal}
          onRequestClose={(event) => closeMyCommunityModal(event)}
          style={customStyles}
          contentLabel="Example Modal"
          className= "modal-content"
        >
            <div className='create-content'>
              <h4 className="create-head">My Communities</h4>
              <button className='buttons' id='close-btn' onClick={closeMyCommunityModal}>X</button>
              <div className='communities-grid'>
              {myCommunity.map((community, index) => (
                <div className="communitys-grid-items" key={index}>
                  <CommunityCard key={community.cid} cname={community.cname} cid={community.cid}  />
                </div>
              ))}
            </div>
                      
              
              

            </div>
        </Modal>
        </a>



      {/*mycommunities */}
        {/* <div className="dropdown">
          <button className="dropdown-toggle">
            My Communities
          </button>
          <div className={myCommunityMenuClass}>
            {myCommunity.map((community) => {
              <a href="#" className="dropdown-item" >{community} </a>
            })}
          </div>
        </div> */}
        {/* <a href="#" className="dropdown-item" ><MyCommunitiesList /></a> */}
        
        
      </div>
    </div>
  );
}

export default Features;

    