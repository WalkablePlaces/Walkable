import React from 'react'

export default function Entry({name, address, distance}) {

  
  return (
    <div className="result">
      <div className='resultName'><h2>{name}</h2></div>
      <div className='resultAddress'>{address}</div>
    {/* {distance} */}
    </div>
  )
}