import React from 'react'

export default function LandingPage({addressInput, setAddressInput, keywordChoice, setKeywordChoice}) {
        function buttonClick(){
          const address = document.getElementById('address').value;
            if(address !== ''){
                setAddressInput(address)
                console.log(keywordChoice)
            }
          
        }
  
  return (
    <div className='landingPageContainer'>
        <h1>Where's the closest food?</h1>
        <div className='addressInputContainer'>
        <input className='addressInput' id='address' placeholder='Enter Address...'></input>
        <select className='keywordInput' name='keyword' id='keyword' onChange={(e) => setKeywordChoice(e.target.value)} >
          <option>Select Food</option>
          <option value='Pizza'>&nbsp;Pizza</option>
          <option value='Thai'>&nbsp;Thai</option>
          <option value='Mexican'>&nbsp;Mexican</option>
          <option value='Burgers'>&nbsp;Burgers</option>
          <option value='Italian'>&nbsp;Italian</option>
          <option value='Vegan'>&nbsp;Vegan</option>
        </select>
        </div>
        <button className="submitLocation" onClick={buttonClick}>Submit Location</button>
    </div>
  )
}