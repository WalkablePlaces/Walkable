import React from 'react'
import Entry from './Entry.jsx'

export default function ResultsContainer({resultList}) {
  const entries = [];
  console.log('line 6', resultList)
  // iterate through data from backend and for each item create a new Entry passing it data as props which it can render 
  for (let i = 0; i < resultList.length; i++) {
    let curr = resultList[i];
    const {name, address, distance} = curr;
    entries.push(<Entry name={name} address={address} distance={distance} key={i}/>)
  }
  
    return (
      <div>
        {entries}
      </div>
    )
  }