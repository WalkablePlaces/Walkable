import React from 'react'
import { useState, useEffect } from 'react';
import ResultsContainer from './ResultsContainer.jsx';

export default function ResultsPage({addressInput, setAddressInput, keywordChoice}) {
  
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    async function getResults(){
      console.log(keywordChoice);
    try {
      const response = await fetch('http://localhost:3000/getLocationResults', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: addressInput, keywordChoice: keywordChoice}),
      })
      const data = await response.json() 
      // console.log('line 20', data)
      setResultList(data.places);      
    }
    catch (err){
      (console.log(err))
    }
  }
  getResults()
  },[addressInput])
  
  
  return (
    <div className='resultsPage'>
    <h1>Results within walking distance</h1>
    <button className='newSearchButton' onClick={(e) => {setAddressInput(undefined)}}>New Search</button>
    <div className='resultsContainer'>
    <ResultsContainer resultList={resultList}/>
    </div>
    </div>
  )
}