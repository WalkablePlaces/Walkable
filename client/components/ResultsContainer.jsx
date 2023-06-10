import React from 'react'
import Entry from './Entry.jsx'

export default function ResultsContainer({resultsList}) {
  const entries = [];
  // iterate through data from backend and for each item create a new Entry passing it data as props which it can render 
  for (let i = 0; i < resultsList.length; i++) {
    let curr = resultsList[i];
    const {name, address, distance} = curr;
    entries.push(<Entry name={name} address={address} distance={distance}/>)
  }
  
    return (
      <div>
        <h2>Results</h2>
        {entries}
      </div>
    )
  }