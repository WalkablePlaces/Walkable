import React, {useState} from 'react'
import { NavLink, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard'

export default function signup({ isSignedIn, setIsSignedIn }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [distance, setDistance] = useState(3);
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');



  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  
  const handleWalking = (e) => {
    if (e.target.value > 0) {
    setDistance(e.target.value);
  } else {
    setDistance(1);
  }
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  // handle fetch post request for signup
  const handleSignUp = async () => {
    try {
      const settings = {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
          'Content-Type': 'application/json',
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              distance: distance*1600, // converting miles to meters
              password,
              location,
            })
          }
        }
        const response = await fetch('/api/signup', settings);
        if (response.status === 200) setIsSignedIn(true);
      }
    catch (e) {
      console.log(e.message);
    };
  };


  return ( isSignedIn ? (<Dashboard/>) : (
    <div>
      Signup for Walkable
      <form>
        <input type='text' placeholder='First Name' onChange={handleFirstName}/>
        <br></br>
        <input type='text' placeholder='Last Name' onChange={handleLastName}/>
        <br></br>
        <input type='text' placeholder='Email Address' onChange={handleEmail}/>
        <br></br>
        <div>
        <input type='number' placeholder='Preferred Walking Distance (Mi)' onChange={handleWalking} value={distance}/>
        Miles
        </div>
        <br></br>
        <input type='text' placeholder='Your Location' onChange={handleLocation}/>
        <br></br>
        <input type='password' placeholder='Super Secret Password' onChange={handlePassword}/>
        <br></br>
        <button onClick={handleSignUp}> Sign up </button>
      </form>
      <NavLink to="/login" ><button>Login</button></NavLink>
    </div>
)
  )
}
