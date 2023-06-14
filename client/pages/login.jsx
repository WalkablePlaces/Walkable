import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import Dashboard from './Dashboard'

export default function login({ isSignedIn, setIsSignedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const settings = {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
            body: JSON.stringify({
              email,
              password,
            })
          }
        }

        const response = await fetch('/login', settings);
        if (response.status === 200) setIsSignedIn(true);
    }
    catch (e) {
      console.log(e.message);
    };
  };


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

 
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  
  return ( isSignedIn ? (<Dashboard/>) : (
    <div>
      Login to Walkable
      <form> 
        <input type='text' placeholder={'Email Address'} onChange={handleEmail}/>
        <br></br>
        <input type='text' placeholder={'Password'} onChange={handlePassword}/>
        <br></br>
        <button onClick={handleLogin}>Login</button>
      </form>
      <NavLink to="/" ><button>Signup</button></NavLink>
    </div>
    )
  )
}
