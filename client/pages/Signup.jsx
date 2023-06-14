import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserActionCreator } from '../actions/actions';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [distance, setDistance] = useState(3);
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  // handle signup inputs
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
  

  const handleSetDistance = (value) => {
    setDistance(value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  // declare dispatch to invoke action
  const dispatch = useDispatch();

  // use navigate to change route on successful login
  let navigate = useNavigate();

  // fake user data for testing reducer state
  const fakeUser = {
    id: 5,
    firstName: 'Bryan',
    lastName: 'Trang',
    email: 'bryan@bryan.com',
    imgUrl: '',
    radius: 6,
    location: 'Los Angeles, CA',
    loginStatus: true,
  }

   // post request for signup -> should update userState after 200 repsonse
  const handleSignUp = async (e) => {
    // use prevent default here because of form default reload
    e.preventDefault();
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
              radius: radius*1600, // converting miles to meters
              password,
              location,
            })
          }
        }
        const response = await fetch('/api/signup', settings);
        if (response.status === 200) {
          dispatch(setUserActionCreator(fakeUser));
          navigate("/dashboard");
        };
      }
    catch (e) {
      console.log(e.message);
    };
  };


  return (
    <div>
      Signup for Walkable
      <form>
        <input type='text' placeholder='First Name' onChange={handleFirstName}/>
        <br></br>
        <input type='text' placeholder='Last Name' onChange={handleLastName}/>
        <br></br>
        <input type='text' placeholder='Email Address' onChange={handleEmail}/>
        <br></br>
        <Box sx={{ width: 300 }}>
        <Slider
        aria-label="Miles"
        defaultValue={1}
        getAriaValueText={handleSetDistance}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
      />
      </Box>
        <br></br>
        <input type='text' placeholder='Your Location' onChange={handleLocation}/>
        <br></br>
        <input type='password' placeholder='Super Secret Password' onChange={handlePassword}/>
        <br></br>
        <button onClick={handleSignUp}> Sign up </button>
      </form>
      <NavLink to="/login" ><button>Go to Login</button></NavLink>
    </div>
  )
}
