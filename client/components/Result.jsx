import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFavoritesActionCreator } from '../actions/actions';

export default function Result({ name, address, distance, walkTime, favorited }) {

  const [isFavorited, setIsFavorited] = useState(false);

  const dispatch = useDispatch();


  const handleAddFavorite = async () => {
    try {
      const settings = {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
            body: JSON.stringify({
              name,
              address,
              distance,
              walkTime,
              favorited,
            })
          }
        }
      const data = fetch('/api/addFavorite', settings);
      const response = await data.json().data; // new marketList 
      dispatch(setFavoritesActionCreator(response));
        setIsFavorited(true);
    }
    catch (e) {
      console.log(e.message);
    }
  };


  const handleDeleteFavorite = async () => {
    try {
      const settings = {
        method: 'DELETE',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
            body: JSON.stringify({
              name,
              address,
              distance,
              walkTime,
              favorited,
            })
          }
        }
      const data = fetch('/api/deleteFavorite', settings);
      const response = await data.json().data;
      dispatch(setFavoritesActionCreator(response));
      setIsFavorited(false);
    }
    catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>Result
        <button onClick={isFavorited ? handleAddFavorite : handleDeleteFavorite}>{isFavorited ? 'Added to Favorite' : 'Not Favorited'}</button>
        {name}
        {address}
        {distance}
        {walkTime}
    </div>
  )
}
