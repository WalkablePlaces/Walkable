import React from 'react'

export default function LandingPage({addressInput, setAddressInput}) {
        function buttonClick(){
          const input = document.getElementById('address').value;
            if(input !== ''){
                setAddressInput(input)
            }
          
        }
  
  return (
    <div className='landingPageContainer'>
        <h1>Where are you?</h1>
        <div className='addressInputContainer'>
        <label className='addressLabel'>Address: </label>
        <input className='addressInput' id='address'></input>
        </div>
        <button className="submitLocation" onClick={buttonClick}>Submit Location</button>
    </div>
  )
}