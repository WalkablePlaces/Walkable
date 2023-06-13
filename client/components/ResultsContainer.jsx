import React from 'react'
import Entry from './Entry.jsx'
import { useState, useEffect } from 'react';

export default function ResultsContainer({resultList}) {
  let entries = [];
  resultList.sort((a, b) => a.walkTimeNum - b.walkTimeNum);
  const [favoritedStatus, setFavoritedStatus] = useState(resultList.slice());
  // iterate through data from backend and for each item create a new Entry passing it data as props which it can render 

    for (let i = 0; i < resultList.length; i++) {
      let curr = resultList[i];
      console.log('line 15 results container')
      const {name, address, distance, walkTime, walkTimeNum, favorited} = curr;
      entries.push(<Entry favoritedStatus={favoritedStatus} setFavoritedStatus={setFavoritedStatus} name={name} address={address} distance={distance} walkTime={walkTime} key={i} walkTimeNum={walkTimeNum} favorited={favorited}/>)
    }
  
  useEffect(() => {
    entries = []; 
  for (let i = 0; i < resultList.length; i++) {
    let curr = resultList[i];
    const {name, address, distance, walkTime, walkTimeNum, favorited} = curr;
    entries.push(<Entry favoritedStatus={favoritedStatus} setFavoritedStatus={setFavoritedStatus} name={name} address={address} distance={distance} walkTime={walkTime} key={i} walkTimeNum={walkTimeNum} favorited={favorited}/>)
  }
},[favoritedStatus]);
    return (
      <div>
        {entries}
      </div>
    )
  }