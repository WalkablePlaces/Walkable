import React from 'react'
// import FavoritesContainer from '../components/favoritesContainer'
import CategoryContainer from '../components/CategoryContainer'
export default function Dashboard() {


  // Resturants
  // Bars
  // Park
  // Store
  // Cafe

  // create a const array to hold all favorites
  
  // make a fetch request to /api/favorites
    // for each of the results that come back for the user
      // push a favorites category component into the array
  
  
  return (
    <div>
      <div>
        <h2>What do you want to do in LOCATION</h2>
        <CategoryContainer/>
      </div>
      <div>
      <h2>Your Favorites</h2>
      
      </div>
      
    </div>
  )
}


