import React from 'react'

export default function Entry({name, address, distance, walkTime}) {

  
  return (
    <div className="result">
      <div className='resultName'><h2>{name}</h2></div>
      <div className='resultAddress'>{address}</div>
      <div className='resultDistance'>{distance}</div>
      <div className='resultWalkTime'>{walkTime}</div>
    </div>
  )
}