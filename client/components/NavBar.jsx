import React from 'react';
import { NavLink } from 'react-router-dom';

export default function navBar() {
  return (
    <nav>

        <NavLink to="/dashboard">Dashboard</NavLink> 
        <NavLink to="/search">Search</NavLink>

    </nav>
  )
}
