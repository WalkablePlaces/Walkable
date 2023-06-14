import { combineReducers } from 'redux';

// import all reducers here
import searchReducer from './searchReducer.js';
import userReducer from './userReducer.js';

// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  search: searchReducer,
  user: userReducer,
});

// make the combined reducers available for import
export default reducers;
