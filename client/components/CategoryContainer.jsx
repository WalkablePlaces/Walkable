import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchActionCreator } from '../actions/actions';

export default function CategoryContainer() {
    // { type, location, radius }
    const type = 'Test', location = 'TestTest', radius = 200;
    const dispatch = useDispatch();

    // If a catageory has been clicked
    // render the results page
    const search = useSelector((state) => state.search);

    const onCategoryClick = async () => {
        console.log(search);
        await dispatch(setSearchActionCreator({type, location, radius}))
    };

console.log(search);

// /getLocationResults



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
