import React, { useState, useEffect } from 'react'
import LandingPage from './LandingPage'
import ResultsPage from './ResultsPage'
import './styles.css'

export default function App() {
const [searchStatus, setSearchStatus] = useState('');
  
  return (
    <div>
    {searchStatus === '' ? <LandingPage searchStatus={searchStatus} setSearchStatus={setSearchStatus} /> : <ResultsPage />}
    </div>
  )
}
