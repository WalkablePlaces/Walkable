import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Result from '../components/Result';

export default function search() {
  const [renderResults, setRenderResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  
  // get search state and deconstructe the search obj
  const searchState = useSelector((state) => state.search);
  const {type, location, radius} = searchState;

  // post request to get results from search
  const generateResults = async () => {
    try {
    const settings = {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
        'Content-Type': 'application/json',
          body: JSON.stringify({
            type,
            radius: radius*1600, // converting miles to meters
            location,
          })
        }
      }
      
    // handle search 
    const handleSearch = (e) => {
      setSearchValue(e.target.value);
    };

    if (type !== '' && radius !== 0 && location !== '') { 
      const data = await fetch('/api/getLocationResults', settings);
      const response = await data.json().places; // array of objects
      // walk time num used here to sort response
      response.sort((a, b) => a.walkTimeNum - b.walkTimeNum);
      const resultsArray = [];
        response.forEach(place => {
          const {name, address, distance, walkTime, favorited} = place;
          resultsArray.push(<Result name={name} address={address} distance={distance} walkTime={walkTime} favorited={favorited}></Result>)
        });
      setRenderResults(resultsArray);
    }

    }
    catch (e) {
      console.log(e.message);
    };
  }

  generateResults();

  return (
    <div>
      <form>
      <input type="text" onChange={handleSearch} placeholder="Search in a different location"/>
      </form>
      <div>
        <div>Showing {type} in {location} within {radius} miles</div>
        Display results here...
        {renderResults}
      </div>
    </div>
  )
}
