import React from 'react'
import Entry from './Entry.jsx'

export default function ResultsContainer({resultList}) {
  const entries = [];
  resultList.sort((a, b) => a.walkTimeNum - b.walkTimeNum);
  
  // iterate through data from backend and for each item create a new Entry passing it data as props which it can render 
  for (let i = 0; i < resultList.length; i++) {
    let curr = resultList[i];
    const {name, address, distance, walkTime, walkTimeNum, favorited} = curr;
    entries.push(<Entry name={name} address={address} distance={distance} walkTime={walkTime} key={i} walkTimeNum={walkTimeNum} favorited={favorited}/>)
  }

    return (
      <div>
        {entries}
      </div>
    )
  }