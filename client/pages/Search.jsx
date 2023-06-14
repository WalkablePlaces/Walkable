import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Result from '../components/Result';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import 'react-dropdown/style.css';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import { setSearchActionCreator } from '../actions/actions';
import Box from '@mui/material/Box';

export default function search() {
  const [renderResults, setRenderResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('Resturant');
  const [radiusNum, setRadiusNum] = useState(1);
  
  // get search state and deconstructe the search obj
  const searchState = useSelector((state) => state.search);
  const {type, location, radius} = searchState;

  const dispatch = useDispatch();


  // post request to get results from search
  const generateCategoryResults = async () => {
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


  const generateSearchResults = async () => {
    try {
      dispatch(setSearchActionCreator({type: searchType, location: searchValue, radius: radiusNum}));
      const settings = {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
          'Content-Type': 'application/json',
            body: JSON.stringify({
              type: searchType,
              radius: radiusNum*1600, // converting miles to meters
              location: searchValue,
            })
          }
        }

        const data = fetch('/api/getLocationResults', settings);
        const response = await data.json().places;
        
        const resultsArray = [];
        response.forEach(place => {
          const {name, address, distance, walkTime, favorited} = place;
          resultsArray.push(<Result name={name} address={address} distance={distance} walkTime={walkTime} favorited={favorited}></Result>)
        });
      setRenderResults(resultsArray);
      
    }
    catch(e) {
      console.log(e.message);
    }
  };


const handleSearchField = (e) => {
  setSearchValue(e.target.value);
};

const handleTypeDropdown = (e) => {
  setSearchType(e.target.value);
}

const handleRadiusSlider = (value) => {
  setRadiusNum(value);
};

generateCategoryResults();

  return (
    <div>
      <form onSubmit={generateSearchResults}>
      <input type="text" onChange={handleSearchField} placeholder="Search in a different location"/>
      <Box sx={{ width: 300 }}>
      <FormControl fullWidth>
        <InputLabel >Place</InputLabel>
        <Select
          value={searchType}
          label="Place"
          onChange={handleTypeDropdown}
        >
          <MenuItem value={'Resturant'}>Resturant</MenuItem>
          <MenuItem value={'Bar'}>Bar</MenuItem>
          <MenuItem value={'Park'}>Park</MenuItem>
          <MenuItem value={'Store'}>Store</MenuItem>
          <MenuItem value={'Cafe'}>Cafe</MenuItem>
        </Select>
      </FormControl>
      <Slider
        aria-label="Miles"
        defaultValue={1}
        getAriaValueText={handleRadiusSlider}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
      />
      </Box>
      </form>
      <div>
        <div>Showing {type} in {location} within {radius} miles</div>
        {renderResults.length ? renderResults : <div> Search for nearby walkable places </div>}
      </div>
    </div>
  )
}
