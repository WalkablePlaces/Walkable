import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setUserActionCreator } from '../actions/actions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handle email and password inputs
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
 
  const handlePassword = (e) => {
    setPassword(e.target.value);
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

  
  // post request for login -> should update userState after 200 repsonse
  const handleLogin = async (e) => {
    // use prevent default here because of form default reload
    e.preventDefault();
    
    // test code to make sure state is working and navigate works
    // dispatch(setUserActionCreator(fakeUser));
    // navigate('/dashboard');

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
        if (response.status === 200) {
          dispatch(setUserActionCreator(fakeUser));
          navigate('/dashboard');
        }; 
    }
    catch (e) {
      console.log(e.message);
    };
  };
  
  return (
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
}
