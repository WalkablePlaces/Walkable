import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import FavoritesContainer from '../components/favoritesContainer'
import CategoryContainer from '../components/CategoryContainer'
import { setFavoritesActionCreator } from '../actions/actions';

export default function Dashboard() {
  const [renderFavorites, setRenderFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites.favoritesList);
  const {location, radius} = user;
  // Resturant
  // Bar
  // Park
  // Store
  // Cafe

  // create a const array to hold all favorites
  const dispatch = useDispatch();
  
  // make a fetch request to /api/favorites
    // for each of the results that come back for the user
      // push a favorites category component into the array
    const getFavorites = () => {
      const favoritesArray = [];
        favorites.forEach(favorite => {
          const {name, address, distance, walkTime, favorited} = favorite; // store
          favoritesArray.push(<Result name={name} address={address} distance={distance} walkTime={walkTime} favorited={favorited}></Result>)
        });
      setRenderFavorites(favoritesArray);
    }

    // useEffect to fetch new favorites from db when state changes
    useEffect(() => {
      getFavorites();
    }, [favorites]);
  
  return (
    <div>
      <div>
        <h2>What do you want to do in {location !== '' ? location + '?' : 'your area?'}</h2>
        <CategoryContainer type={'Resturant'} location={location} radius={radius}/>
        <CategoryContainer type={'Bar'} location={location} radius={radius}/>
        <CategoryContainer type={'Park'} location={location} radius={radius}/>
        <CategoryContainer type={'Store'} location={location} radius={radius}/>
        <CategoryContainer type={'Cafe'} location={location} radius={radius}/>
      </div>
      <div>
      <h2>Your Favorites</h2>
      {favorites.length ? renderFavorites : <div> You have no favorites </div>}
      </div>
    </div>
  )
}


