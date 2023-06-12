import React, { useState, useEffect } from 'react'
import LandingPage from './LandingPage'
import ResultsPage from './ResultsPage'
import './styles.css'

export default function App() {
const [addressInput, setAddressInput] = useState(undefined);
const [keywordChoice, setKeywordChoice] = useState('') 

return (
    <div>
    {addressInput === undefined ? <LandingPage keywordChoice={keywordChoice} setKeywordChoice={setKeywordChoice} addressInput={addressInput} setAddressInput={setAddressInput} /> : <ResultsPage addressInput={addressInput} setAddressInput={setAddressInput} />}
    </div>
  )
}
