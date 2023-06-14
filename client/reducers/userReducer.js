import * as actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  imgUrl: '',
  radius: 1,
  location: '',
  loginStatus: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.setUserActionCreator, (state, action) => {
    const {
      id,
      firstName,
      lastName,
      email,
      imgUrl,
      radius,
      location,
      loginStatus,
    } = action.payload;
    return (state = {
      id,
      firstName,
      lastName,
      email,
      imgUrl,
      radius,
      location,
      loginStatus,
    });
  });
});

export default userReducer;
