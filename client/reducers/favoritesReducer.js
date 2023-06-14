import * as actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
 favoritesList: [],
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setFavoritesActionCreator, (state, action) => {
      const { favoritesList } = action.payload;
      return (state = {
        favoritesList,
      });
    })
    .addDefaultCase((state, action) => state);
});

export default favoritesReducer;
