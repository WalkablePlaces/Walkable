import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchActionCreator } from '../actions/actions';

export default function CategoryContainer() {
    // { type, location, radius }
    // test data for searchState
    const type = 'Test', location = 'TestTest', radius = 200;
    
    // dispatch used to set state
    const dispatch = useDispatch();

    // If a catageory has been clicked
    const searchState = useSelector((state) => state.search);

    // handle category click
    const onCategoryClick =  () => {
        console.log(searchState);
        dispatch(setSearchActionCreator({type, location, radius}))
    };

    console.log(searchState);

    // getLocationResults



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
