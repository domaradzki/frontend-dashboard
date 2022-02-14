import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/usersSlice';

const reducer = combineReducers({
  users: usersReducer,
});

const store = configureStore({
  reducer,
});

export default store;
