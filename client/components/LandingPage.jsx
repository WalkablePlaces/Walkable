import React from 'react'

export default function LandingPage({addressInput, setAddressInput, keywordChoice, setKeywordChoice}) {
        function buttonClick(){
          const address = document.getElementById('address').value;
            if(address !== ''){
                setAddressInput(address)
            }
          
        }
  
  return (
    <div className='landingPageContainer'>
        <h1>Where are you?</h1>
        <div className='addressInputContainer'>
        <label className='addressLabel'>Address: </label>
        <input className='addressInput' id='address'></input>
        <select className='keywordInput' name='keyword' id='keyword' onChange={(e) => setKeywordChoice(e.target.value)} >
          <option>Select Food</option>
          <option value='Pizza'>Pizza</option>
          <option value='Thai'>Thai</option>
          <option value='Mexican'>Mexican</option>
          <option value='Burgers'>Burgers</option>
          <option value='Italian'>Italian</option>
          <option value='Vegan'>Vegan</option>
        </select>
        </div>
        <button className="submitLocation" onClick={buttonClick}>Submit Location</button>
    </div>
  )
}