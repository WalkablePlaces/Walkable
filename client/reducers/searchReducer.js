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
      console.log(action.payload);
      const { type, location, radius } = action.payload;
      state.type = type;
      state.location = location;
      state.radius = radius;
    })
    .addDefaultCase((state, action) => state);
});

export default searchReducer;
