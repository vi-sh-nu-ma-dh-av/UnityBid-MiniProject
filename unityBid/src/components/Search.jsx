import React, { useState, useEffect } from 'react';
import "./Search.css";
import { request } from '../axios_helper';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    
    // const [matchingAuctions, setMatchingAuctions] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [matchingCommunities, setMatchingCommunities] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("hi")
        if (searchTerm !== '') {
           try{
                const url =`/user/searchcommunity?cname=${searchTerm}`
                const fetchAuctionsAndCommunities = async () => {
                try{
                const communitiesResponse = await request('get',url);
                
                
                setCommunities(communitiesResponse.data);
                //console.log(communities)
                setShowDropdown(true)
                setLoading(flase)
                }catch(error){
                    console.log(error)
                    setLoading(false)
                }
            };
            
            //console.log(communities)
            fetchAuctionsAndCommunities();
            console.log("hello")
           }catch(error){console.log(error)};
        }
    }, [searchTerm]);

    useEffect(() => {
        console.log(communities)
    }, [communities])

    const handleSearchChange = (event) => {
        const input = event.target.value.toLowerCase();
        
    
        if (input === '') {
            // If the input is empty, clear the results and hide the dropdown
            // setMatchingAuctions([]);
            setMatchingCommunities([]);
            setShowDropdown(false);
            setSearchTerm('');
        } else {
            // Filter auctions
            // const filteredAuctions = matchingAuctions.filter(auction => auction.title.toLowerCase().startsWith(input)).slice(0, 7);
            // setMatchingAuctions(filteredAuctions);
    
            // Filter communities
            const filteredCommunities = communities.filter(community => community.toLowerCase().startsWith(input)).slice(0, 7);
            setMatchingCommunities(filteredCommunities);
    
            setSearchTerm(input);
            setShowDropdown(true);
            console.log(matchingCommunities)
        }
    };
    

    const handleDropdownClick = (value) => {
        setSearchTerm(value);
        navi
        setShowDropdown(false);
    };

    return (
        <div className='dropdown'>
            <input
                className='home-search'
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {showDropdown && !loading && (
                
                    <div className='dropdown-search'>
                        {/* <ul className='dropdown-ul'>
                            {matchingAuctions.map((auction, index) => (
                               auction.title && <li key={index} onClick={() => handleDropdownClick(auction.title)} className='dropdwon-li'>
                                    {auction.title} (Community: {auction.community})
                                </li>
                            ))}
                        </ul> */}
                        <ul className='dropdown-ul'>
                            {console.log(matchingCommunities.length)}
                            {matchingCommunities.map((community, index) => {
                                console.log(community);
                                return(
                                    <li key={index} onClick={() => handleDropdownClick(community)} className='dropdown-li'>
                                    {community}
                                </li>
                                );
                            })}
                        </ul>
                    </div>
                    
                
            )}
        </div>
    );
};

export default Search;