import React from 'react'

export default function LandingPage({searchStatus, setSearchStatus}) {
        function buttonClick(input){
            if(input !== ''){
                setSearchStatus('true')
                console.log(searchStatus)
            }
        }
  
  return (
    <div className='landingPageContainer'>
        <h1>Where are you?</h1>
        <div className='addressInputContainer'>
        <label className='addressLabel'>Address: </label>
        <input className='addressInput'></input>
        </div>
        <button className="submitLocation" onClick={buttonClick}>Submit Location</button>
    </div>
  )
}