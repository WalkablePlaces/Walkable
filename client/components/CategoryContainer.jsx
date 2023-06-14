import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchActionCreator } from '../actions/actions';

export default function CategoryContainer({ type, radius, location }) {
    // { type, location, radius }
    // test data for searchState
    // const type = 'Test', location = 'TestTest', radius = 200;
    
    // dispatch used to set state
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // handle category click
    const onCategoryClick =  async () => {
      try {
        dispatch(setSearchActionCreator({type, location, radius}))
        navigate('/search');
       } catch (e) {
        console.log(e.message);
      }
    };

  return (
    <div style={{width: "50px", height: "50px"}}>
        <NavLink to='/search'>
        <button onClick={onCategoryClick}>
            {type}
            <img></img>
        </button>
        </NavLink>
    </div>
  )
};
