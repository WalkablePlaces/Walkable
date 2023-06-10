import React from 'react'
import MainContainer from './MainContainer.jsx'

export default function ResultsPage({addressInput, setAddressinput}) {
  let resultsList;
  fetch('/getLocationResults', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {query: addressInput},
  })
  .then(data => data.json())
  .then(data => {
    console.log(data);
    resultsList = data;
  })
  .catch(err => console.log(err))
  
  return (
    <div className='resultsPageContainer'>
    <h1>Results within walking distance</h1>
    <MainContainer resultsList={resultsList}/>
    </div>
  )
}