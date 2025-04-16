import React, { useEffect, useState } from "react";
import "./BiddingPage.css"
import clock from "./clock.png"
import warning from "./Warning.png"
import { useLocation } from "react-router-dom";
import Modal from 'react-modal';
import { request } from "../axios_helper";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      height: '30%',
      overflow: 'auto',
      transition: 'all 0.3s ease-in-out',
      position: 'relative'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      transition: 'all 0.3s ease-in-out'
    }
  };

Modal.setAppElement('#root');

const BiddingPage = () => {
  

  const [startPrice, setStartPrice] = useState();
  const [increment, setIncrement] = useState(5000);
  const [bidDate, setBidDate] = useState("1-1-2024");
  const [h1Bid, setH1Bid] = useState('');
  const [yourRank, setYourRank] = useState();
  const [lastAcceptedBid, setLastAcceptedBid] = useState();
  const [nextPossibleBid, setNextPossibleBid] = useState();
    
  
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  
    
  
  }, []);
  

  const location = useLocation();
  const {auctionId, product, communityId, user} = location.state;

  

  const fetchLastAcceptedBid = async () => {
    const url = `/user/community/auction/bid/highestbid?aid=${auctionId}&cid=${communityId}`
    const response = await request('get', url);
    setLastAcceptedBid(response.data);
    if(lastAcceptedBid == 0){
      setNextPossibleBid(startPrice)
    }
    else{
      
      setLastAcceptedBid(response.data)
      setNextPossibleBid(response.data+increment)
    }
  };
  useEffect(() => {
    const fetchStartingPrice = async () => {
      const url = `/user/community/auction/getstartingprice?aid=${auctionId}&cid=${communityId}`;
      const response = await request('get', url);
      setStartPrice(response.data);
      console.log("startprice", response.data);
    };
    
    const fetchStartDate = async () => {
        const url = `/user/community/auction/getstartingdate?aid=${auctionId}&cid=${communityId}`;
        const response = await request('get', url);
        setBidDate(response.data);
    };

  
    const fetchRank = async () => {
      console.log("rank1")
      
      console.log(`uid: ${user.uid}`)
      try {
        const url = `/user/community/auction/bid/rankofuser?aid=${auctionId}&&uid=${user.uid}`;
        const response = await request('get', url);
        setYourRank(response.data);
        console.log("rank")
      } catch (error) {
        console.log('An error occurred:', error);
      }
    };

    const fetchHighBid = async () => {
      try{
        const url = `/user/community/auction/bid/highestbiddername?aid=${auctionId}&cid=${communityId}`;
        const response = await request('get', url);
        setH1Bid(response.data)
      }catch(error){
        console.log(error)
      }
      
    }
    
    
  
    
    
    
    
  
    fetchStartingPrice();
    console.log("calling rank")
    fetchRank();
    console.log("rank called")
    fetchStartDate();
    fetchLastAcceptedBid();
    fetchHighBid();
  }, [auctionId, communityId, user.uid])

  const [auctionStart, setAuctionStart] = useState(new Date('2024-04-29T10:00:00'));
  const [auctionEnd, setAuctionEnd] = useState(
    new Date(auctionStart.getTime() + 2 * 60 * 60 * 1000)
  );

  function convertMsToTime(milliseconds) {
    let seconds = Math.floor((milliseconds / 1000) % 60),
        minutes = Math.floor((milliseconds / (1000 * 60)) % 60),
        hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }

  const [timeLeft, setTimeLeft] = useState(convertMsToTime(auctionEnd - new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(convertMsToTime(auctionEnd - new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, [auctionEnd]);


  //modal opening
  let subtitle;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };


  

  //bid logic
  const [bidAmountFigure, setBidAmountFigure] = useState('');
  const [bidAmountWords, setBidAmountWords] = useState('');

  const handleBid = async () => {
    // Convert the bid amount figure to an integer
    const bidAmount = parseInt(bidAmountFigure, 10);
    // Check if the conversion is successful (not NaN)
    if (!isNaN(bidAmount)) {
      // Proceed with the bidding logic using bidAmount
      console.log('Bid Amount:', bidAmount);
      // ... (bidding logic here)
      if(bidAmount >= nextPossibleBid){
        //setLastAcceptedBid(bidAmount)
        //setH1Bid(bidAmount)
        //setNextPossibleBid(bidAmount + increment)
  
        // Prepare the data to send to the server
        const data = {
          cid: communityId,
          aid: auctionId, // replace with your auctionId variable
          bid: bidAmount,
          uid: user.uid // replace with your user.uid variable
        };
  
        // Send a POST request to the server
        try {
          const url = `/user/community/auction/bid/storebid?aid=${auctionId}&cid=${communityId}&uid=${user.uid}&bid=${bidAmount}`
          const response = await request('POST', url); // replace '/your-endpoint' with your actual endpoint
          console.log(response.data);
          fetchRank();
          fetchLastAcceptedBid();
          window.location.reload()
        } catch (error) {
          console.error(error);
        }
      }
      else{
        window.alert("Not enough amount")
      }
    } else {
      // Handle the case where the input is not a valid number
      console.error('Invalid input: not a number');
    }
    closeModal()
  };
  


  return (
        
    <>
    <div>
          <div className="bid-main">
              {/* ... rest of your HTML code ... */}
              <div className="bid-container">
                  <div className="bid-box1">
                      <h1>Bidding Hall</h1>
                  </div>
                  <div className="bid-box2">
                        <div className="bid-box2-h">
                            <h1>{user.name}</h1>
                        </div>
                        <div className="bid-box2-h">
                            <h1>{product}</h1>
                        </div>
                      
                      
                  </div>
                  <div className="bid-box3">
                      <img id="img" src={clock} alt="clock" />
                      <div className="bid-col1">
                            <div id="currentDateTime">Current Date & Time: {currentDateTime.toLocaleString()} </div>
                            <div id="remainingTime">Remaining Time: {timeLeft.toLocaleString()} </div>
                      </div>
                      <div className="bid-col2">
                          <div id="startTime">Auction Start: {auctionStart.toLocaleString()} </div>
                      </div>
                      <div className="bid-col3">
                          <div id="endTime">Auction End: {auctionEnd.toLocaleString()} </div>
                          <div className="bid-current-extensions">
                              <div id="Current_extensions"><b>Current extensions(s) in no: </b></div>
                              <div id="Current_extensions"><b>0</b></div>
                          </div>
                      </div>

                  </div>
                  <div className="bid-tablebox">
                      <div className="bid-price">
                          <div className="bid-box4">
                              <div><b>Start price: {startPrice}</b></div>
                              <div><b>Increment: {increment}</b></div>
                              <div><b>Bid date: {bidDate}</b></div>
                              <div><b>Last accepted bid: {lastAcceptedBid}</b></div>
                          </div>
                          <div className="bid-box6">
                              <div><b>Highest bid: {h1Bid}</b></div>
                              <div><b>Your rank: {yourRank}</b></div>
                              <div><b>Next possible bid: {nextPossibleBid}</b></div>
                          </div>
                      </div>
                      <div className="bid-table-container">
                          <table className="bid-responsive-table">
                              <thead>
                                  <tr className="bid-thr">
                                      <th>Sr.No</th>
                                      <th>Item Description</th>
                                      <th>
                                          Rate <span className="bid-diable">(in Rs. In Fig)</span> <span className="bid-enable">In Fig</span>
                                      </th>
                                      <th>
                                          Rate <span className="bid-diable">(in Rs.In Words)</span> <span className="bid-enable">In
                                              Words</span>
                                      </th>
                                      <th>Bid</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr className="bid-tdr">
                                      <td>1</td>
                                      <td>Sale of Property by Bank</td>
                                      <td>
                                        <input
                                            type="text"
                                            value={bidAmountFigure}
                                            onChange={(e) => setBidAmountFigure(e.target.value)}
                                            placeholder="Enter the Rate in figure"
                                        />
                                      </td>
                                      <td>
                                        <input
                                            type="text"
                                            value={bidAmountWords}
                                            onChange={(e) => setBidAmountWords(e.target.value)}
                                            placeholder="Enter the Rate in words"
                                        />
                                      </td>
                                      <td>
                                        <button className="bid-btn" onClick={openModal}>Bid</button>

                                        <Modal
                                            isOpen = {isModalOpen}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                        >
                                            
                                            <button className='buttons' id='close-btn' onClick={closeModal}>X</button>
                                            
                                            <div className="bid-modal-content">
                                                <div id="confirmationText">Please confirm your bidding amount.</div>
                                                <div className="bid-buttons">
                                                    <button id="yesButton" className="bid-yes" onClick={handleBid}>Yes</button>
                                                    <button id="noButton" className="bid-no" onClick={closeModal}>No</button>
                                                </div>
                                            </div>
                                            
                                        </Modal>
                                        
                                      </td>
                                  </tr>
                              </tbody>
                          </table>

                      </div>
                  </div>

                  <div className="bid-box7">
                      <div>
                          <span className="bid-diable">
                              <img src={warning} alt="" />You are advised not to wait till last minute or last few seconds
                              to
                              submit your bid to avoid complications related to internet connectivity, network problems,
                              system
                              crash down, power failure, etc. Neither department nor Unity Bid Technologies Ltd. are responsible for any unforeseen circumstances.
                          </span>
                          <span className="bid-enable">
                              Avoid last-minute bid submissions to prevent issues like internet connectivity, system crashes, or power failures. Neither the department nor the service providers are responsible for such complications.
                          </span>
                      </div>
                  </div>
              </div>
          </div>
          
          
          {/* ... rest of your HTML code ... */}
      </div>
      
      
      
      </>
  );
};

export default BiddingPage;
