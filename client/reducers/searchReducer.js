import * as actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  location: '',
  radius: 0,
};

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setSearchActionCreator, (state, action) => {
      const { type, location, radius } = action.payload;
      return (state = {
        type,
        location,
        radius,
      });
    })
    .addDefaultCase((state, action) => state);
});

export default searchReducer;
