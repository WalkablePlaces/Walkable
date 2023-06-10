import React from 'react'

export default function Entry({name, address, distance}) {

  
  return (
    <div className="result">
      <div>{name}</div>
      <div>{address}</div>
    {/* {distance} */}
    </div>
  )
}