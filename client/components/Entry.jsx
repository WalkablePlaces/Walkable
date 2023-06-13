import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';

export default function Entry({name, address, distance, walkTime, favorited, walkTimeNum}) {

let FavIcon;
  
  const favClick = () => {
    if(favorited !== true){
    fetch('http://localhost:3000/addFavorite', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, address, distance, walkTime, walkTimeNum}),
      })
      favorited = true; 
    } else {
      fetch('http://localhost:3000/addFavorite', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({address})
      })
      favorited = false;
    }
  } 

  if (favorited) FavIcon = (<span className="favIcon"><FAIcon onClick={favClick} icon={solidStar} style={{ color: '#476fc5' }} /></span>);
  else FavIcon = (<span className="favIcon"><FAIcon onClick={favClick} icon={regStar} /></span>);

  // useEffect(() => {
  //   function innerFunc() {
  //     console.log('line 39')
  //     if (favorited) FavIcon = (<span className="favIcon"><FAIcon onClick={favClick} icon={solidStar} style={{ color: '#476fc5' }} /></span>);
  //     else FavIcon = (<span className="favIcon"><FAIcon onClick={favClick} icon={regStar} /></span>);
  //   }
  //   innerFunc()
  // }, [])
  
  return (
    <div className="result">
        {/* <input onClick={favClick} type="checkbox"/> */}
        {FavIcon}
        
      <div className='resultName'><h2>{name}</h2></div>
      <div className='resultAddress'>{address}</div>
      <div className='resultDistance'>{distance}</div>
      <div className='resultWalkTime'>{walkTime}</div>
    </div>
  )
}